import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { HumanMessage } from '@langchain/core/messages';
import 'dotenv/config';

/**
 * 基础工具定义
 * 演示如何定义和使用工具（Function Calling）
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

async function basicToolDemo() {
  console.log('🔧 基础工具演示\n');
  console.log('='.repeat(60));

  // 1. 定义工具
  const getWeatherTool = tool(
    async ({ city }) => {
      console.log(`  📡 正在查询 ${city} 的天气...`);

      const weatherData: Record<string, string> = {
        北京: '25°C，晴天',
        上海: '28°C，多云',
        广州: '32°C，雷阵雨',
      };

      return weatherData[city] || '暂无该城市天气数据';
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
  const llm = new ChatOpenAI({
    modelName: 'deepseek-chat',
    temperature: 0,
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
  });

  const llmWithTools = llm.bindTools([getWeatherTool]);

  // 3. AI 决定是否调用工具
  console.log('\n❓ 用户问题：北京今天天气怎么样？\n');

  const response = await llmWithTools.invoke([new HumanMessage('北京今天天气怎么样？')]);

  console.log('🤖 AI 响应：');
  if (response.tool_calls && response.tool_calls.length > 0) {
    console.log(`  AI 决定调用工具: ${response.tool_calls[0].name}`);
    console.log(`  参数: ${JSON.stringify(response.tool_calls[0].args)}`);

    // 4. 手动执行工具
    const toolResult = await getWeatherTool.invoke(response.tool_calls[0].args);
    console.log(`  结果: ${toolResult}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Function Calling 让 AI 能够调用真实函数');
}

basicToolDemo().catch(console.error);
