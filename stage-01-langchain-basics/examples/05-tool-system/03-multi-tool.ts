import 'dotenv/config';
import { tool, type StructuredToolInterface } from '@langchain/core/tools';
import { z } from 'zod';
import { HumanMessage, type BaseMessage, type ToolMessage } from '@langchain/core/messages';
import { createChatModel } from '@ai-agent/shared';
import { safeEvaluate } from './calculator';

/**
 * 多工具协作：计算器 + 货币转换（使用 DeepSeek 模型）。
 */

// 工具1：计算器（使用安全求值器，杜绝 eval 注入风险）
const calculatorTool = tool(
  ({ expression }) => {
    try {
      return `${expression} = ${safeEvaluate(expression)}`;
    } catch (error) {
      return `计算错误：${error instanceof Error ? error.message : '未知错误'}`;
    }
  },
  {
    name: 'calculator',
    description: '执行数学计算，支持 +、-、*、/ 与括号',
    schema: z.object({
      expression: z.string().describe('数学表达式，如：2+3*4'),
    }),
  }
);

// 工具2：货币转换
const currencyTool = tool(
  ({ amount, from, to }) => {
    const rates: Record<string, Record<string, number>> = {
      CNY: { USD: 0.14, EUR: 0.13 },
      USD: { CNY: 7.2, EUR: 0.92 },
      EUR: { CNY: 7.8, USD: 1.09 },
    };
    const rate = rates[from]?.[to] ?? 1;
    return `${amount} ${from} = ${(amount * rate).toFixed(2)} ${to}`;
  },
  {
    name: 'currency_converter',
    description: '货币转换',
    schema: z.object({
      amount: z.number().describe('金额'),
      from: z.enum(['CNY', 'USD', 'EUR']).describe('源货币'),
      to: z.enum(['CNY', 'USD', 'EUR']).describe('目标货币'),
    }),
  }
);

class MultiToolAssistant {
  private readonly tools: StructuredToolInterface[] = [calculatorTool, currencyTool];
  private readonly model = createChatModel({ temperature: 0 }).bindTools(this.tools);

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
        console.log(`  🔧 调用工具: ${toolCall.name}`);
        console.log(`  📥 参数: ${JSON.stringify(toolCall.args)}`);

        const selected = this.tools.find(t => t.name === toolCall.name);
        if (selected) {
          const toolMessage = (await selected.invoke(toolCall)) as ToolMessage;
          messages.push(toolMessage);
        }
      }
    }
  }
}

async function main() {
  const assistant = new MultiToolAssistant();

  console.log('🧮 多工具协作演示\n');
  console.log('='.repeat(60));

  console.log('\n测试 1：纯计算');
  console.log('-'.repeat(60));
  console.log('👤 用户: 帮我计算 (100+200)*3\n');
  console.log(`💬 最终回答: ${await assistant.chat('帮我计算 (100+200)*3')}`);

  console.log('\n' + '='.repeat(60));
  console.log('测试 2：纯货币转换');
  console.log('-'.repeat(60));
  console.log('👤 用户: 把 500 人民币转换成美元\n');
  console.log(`💬 最终回答: ${await assistant.chat('把 500 人民币转换成美元')}`);

  console.log('\n' + '='.repeat(60));
  console.log('测试 3：复合任务（先计算后转换）');
  console.log('-'.repeat(60));
  console.log('👤 用户: 帮我计算 100+200，然后把结果转换成美元\n');
  console.log(`💬 最终回答: ${await assistant.chat('帮我计算 100+200，然后把结果转换成美元')}`);

  console.log('\n' + '='.repeat(60));
  console.log('✅ AI 能自动组合多个工具完成复杂任务');
}

main().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
