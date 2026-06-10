import 'dotenv/config';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { HumanMessage } from '@langchain/core/messages';
import { createChatModel } from '@ai-agent/shared';

/**
 * 基础工具定义：演示如何定义和使用工具（Function Calling，使用 DeepSeek 模型）。
 */
async function basicToolDemo() {
  console.log('🔧 基础工具演示\n');
  console.log('='.repeat(60));

  // 1. 定义工具
  const getWeatherTool = tool(
    ({ city }) => {
      console.log(`  📡 正在查询 ${city} 的天气...`);
      const weatherData: Record<string, string> = {
        北京: '25°C，晴天',
        上海: '28°C，多云',
        广州: '32°C，雷阵雨',
      };
      return weatherData[city] ?? '暂无该城市天气数据';
    },
    {
      name: 'get_weather',
      description: '获取指定城市的天气信息',
      schema: z.object({
        city: z.string().describe('城市名称，例如：北京、上海'),
      }),
    }
  );

  // 2. 绑定工具到 LLM
  const llmWithTools = createChatModel({ temperature: 0 }).bindTools([getWeatherTool]);

  // 3. AI 决定是否调用工具
  console.log('\n❓ 用户问题：北京今天天气怎么样？\n');
  const response = await llmWithTools.invoke([new HumanMessage('北京今天天气怎么样？')]);

  console.log('🤖 AI 响应：');
  const toolCalls = response.tool_calls ?? [];
  if (toolCalls.length > 0) {
    const toolCall = toolCalls[0];
    console.log(`  AI 决定调用工具: ${toolCall.name}`);
    console.log(`  参数: ${JSON.stringify(toolCall.args)}`);

    // 4. 执行工具：把整个 ToolCall 交给 tool.invoke，返回 ToolMessage
    const toolMessage = await getWeatherTool.invoke(toolCall);
    console.log(`  结果: ${toolMessage.content as string}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Function Calling 让 AI 能够调用真实函数');
}

basicToolDemo().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
