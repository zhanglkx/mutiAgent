import 'dotenv/config';
import { tool, type StructuredToolInterface } from '@langchain/core/tools';
import { z } from 'zod';
import { HumanMessage, type BaseMessage, type ToolMessage } from '@langchain/core/messages';
import { createChatModel } from '@ai-agent/shared';

/**
 * 智能天气助手：自动判断是否需要查询天气并返回结果（使用 DeepSeek 模型）。
 */
const getWeatherTool = tool(
  async ({ city }) => {
    console.log(`  📡 正在查询 ${city} 的天气...`);
    await new Promise(resolve => setTimeout(resolve, 500));

    const weatherData: Record<string, string> = {
      北京: '25°C，晴天',
      上海: '28°C，多云',
      广州: '32°C，雷阵雨',
      深圳: '30°C，晴天',
    };
    return weatherData[city] ?? '暂无该城市天气数据';
  },
  {
    name: 'get_weather',
    description: '获取指定城市的当前天气信息',
    schema: z.object({
      city: z.string().describe('城市名称'),
    }),
  }
);

const getCurrentTimeTool = tool(() => new Date().toLocaleString('zh-CN'), {
  name: 'get_current_time',
  description: '获取当前时间',
  schema: z.object({}),
});

class WeatherAssistant {
  private readonly tools: StructuredToolInterface[] = [getWeatherTool, getCurrentTimeTool];
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
  const assistant = new WeatherAssistant();

  console.log('🌤️ 智能天气助手\n');
  console.log('='.repeat(60));

  console.log('\n测试 1：查询天气');
  console.log('-'.repeat(60));
  console.log('👤 用户: 北京今天天气怎么样？\n');
  console.log(`💬 最终回答: ${await assistant.chat('北京今天天气怎么样？')}`);

  console.log('\n' + '='.repeat(60));
  console.log('测试 2：查询时间');
  console.log('-'.repeat(60));
  console.log('👤 用户: 现在几点了？\n');
  console.log(`💬 最终回答: ${await assistant.chat('现在几点了？')}`);

  console.log('\n' + '='.repeat(60));
  console.log('测试 3：普通问答（不需要工具）');
  console.log('-'.repeat(60));
  console.log('👤 用户: 什么是 React？\n');
  console.log(`💬 最终回答: ${await assistant.chat('什么是 React？')}`);

  console.log('\n' + '='.repeat(60));
  console.log('✅ AI 能自动判断何时需要调用工具');
}

main().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
