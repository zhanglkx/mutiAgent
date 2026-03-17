import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, AIMessage, ToolMessage, BaseMessage } from '@langchain/core/messages';
import { weatherTool, attractionsTool, budgetTool } from './tools';
import { travelPlanSchema, TravelPlan } from './schemas/travel-plan.schema';

/**
 * 智能旅游助手
 * 功能：天气查询、景点推荐、预算计算、旅游计划生成
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */
export class TouristAssistant {
  private llm: ChatOpenAI;
  private tools: any[];

  constructor() {
    this.tools = [weatherTool, attractionsTool, budgetTool];

    // 初始化 LLM - 使用 DeepSeek 模型
    this.llm = new ChatOpenAI({
      modelName: 'deepseek-chat', // 改为 DeepSeek 模型
      temperature: 0.7,
      configuration: {
        baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com', // DeepSeek API 基础 URL
        apiKey: process.env.DEEPSEEK_API_KEY, // 从环境变量获取 API 密钥
      },
    }).bindTools(this.tools);
  }

  /**
   * 普通对话模式
   * 支持多轮工具调用
   */
  async chat(userInput: string): Promise<string> {
    const messages: BaseMessage[] = [new HumanMessage(userInput)];

    while (true) {
      const response = await this.llm.invoke(messages);
      messages.push(response);

      if (!response.tool_calls || response.tool_calls.length === 0) {
        return response.content as string;
      }

      // 执行所有工具调用
      for (const toolCall of response.tool_calls) {
        console.log(`🔧 调用工具: ${toolCall.name}`);

        const tool = this.tools.find(t => t.name === toolCall.name);
        if (tool) {
          const result = await tool.invoke(toolCall.args);
          console.log(`📤 结果: ${result}`);

          messages.push(
            new ToolMessage({
              content: result,
              tool_call_id: toolCall.id!,
            })
          );
        }
      }
    }
  }

  /**
   * 生成结构化旅游计划
   * 返回标准 JSON 格式的旅游计划
   */
  async generatePlan(userInput: string): Promise<TravelPlan> {
    const llmWithSchema = new ChatOpenAI({
      modelName: 'deepseek-chat', // 改为 DeepSeek 模型
      temperature: 0.7,
      configuration: {
        baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com', // DeepSeek API 基础 URL
        apiKey: process.env.DEEPSEEK_API_KEY, // 从环境变量获取 API 密钥
      },
    }).withStructuredOutput(travelPlanSchema);

    return await llmWithSchema.invoke(userInput);
  }
}
