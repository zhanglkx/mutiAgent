import { HumanMessage, type BaseMessage, type ToolMessage } from '@langchain/core/messages';
import type { StructuredToolInterface } from '@langchain/core/tools';
import { createChatModel } from '@ai-agent/shared';
import { travelTools } from './tools';
import { travelPlanSchema, type TravelPlan } from './schemas/travel-plan.schema';

/**
 * 智能旅游助手
 * 功能：天气查询、景点推荐、预算计算、旅游计划生成。
 * 使用 @langchain/deepseek 的 ChatDeepSeek（通过共享工厂创建）。
 */
export class TouristAssistant {
  private readonly tools: StructuredToolInterface[] = travelTools;
  private readonly model = createChatModel({ temperature: 0.7 }).bindTools(this.tools);

  /**
   * 普通对话模式，支持多轮工具调用。
   */
  async chat(userInput: string): Promise<string> {
    const messages: BaseMessage[] = [new HumanMessage(userInput)];

    for (;;) {
      const response = await this.model.invoke(messages);
      messages.push(response);

      const toolCalls = response.tool_calls ?? [];
      if (toolCalls.length === 0) {
        return response.content as string;
      }

      for (const toolCall of toolCalls) {
        console.log(`🔧 调用工具: ${toolCall.name}`);
        const selected = this.tools.find(t => t.name === toolCall.name);
        if (selected) {
          const toolMessage = (await selected.invoke(toolCall)) as ToolMessage;
          console.log(`📤 结果: ${toolMessage.content as string}`);
          messages.push(toolMessage);
        }
      }
    }
  }

  /**
   * 生成结构化旅游计划，返回类型安全的 TravelPlan。
   * 使用 withStructuredOutput —— ChatDeepSeek 原生支持结构化输出。
   */
  generatePlan(userInput: string): Promise<TravelPlan> {
    const planner = createChatModel({ temperature: 0.7 }).withStructuredOutput(travelPlanSchema);
    return planner.invoke(userInput);
  }
}
