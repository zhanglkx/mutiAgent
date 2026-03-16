import { ChatOpenAI } from '@langchain/openai'
import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import {
  HumanMessage,
  AIMessage,
  ToolMessage,
  BaseMessage,
} from '@langchain/core/messages'
import 'dotenv/config'

/**
 * 智能天气助手
 * 功能：自动判断是否需要查询天气，并返回结果
 */

// 1. 定义工具
const getWeatherTool = tool(
  async ({ city }) => {
    console.log(`  📡 正在查询 ${city} 的天气...`)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const weatherData: Record<string, string> = {
      北京: '25°C，晴天',
      上海: '28°C，多云',
      广州: '32°C，雷阵雨',
      深圳: '30°C，晴天',
    }

    return weatherData[city] || '暂无该城市天气数据'
  },
  {
    name: 'get_weather',
    description: '获取指定城市的当前天气信息',
    schema: z.object({
      city: z.string().describe('城市名称'),
    }),
  }
)

const getCurrentTimeTool = tool(
  async () => {
    return new Date().toLocaleString('zh-CN')
  },
  {
    name: 'get_current_time',
    description: '获取当前时间',
    schema: z.object({}),
  }
)

// 2. 创建助手类
class WeatherAssistant {
  private llm: ChatOpenAI
  private tools: any[]

  constructor() {
    this.tools = [getWeatherTool, getCurrentTimeTool]

    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
    }).bindTools(this.tools)
  }

  async chat(userInput: string): Promise<string> {
    const messages: BaseMessage[] = [new HumanMessage(userInput)]

    while (true) {
      // AI 响应
      const response = await this.llm.invoke(messages)
      messages.push(response)

      // 检查是否需要调用工具
      if (!response.tool_calls || response.tool_calls.length === 0) {
        return response.content as string
      }

      // 执行所有工具调用
      for (const toolCall of response.tool_calls) {
        console.log(`  🔧 调用工具: ${toolCall.name}`)
        console.log(`  📥 参数: ${JSON.stringify(toolCall.args)}`)

        const tool = this.tools.find((t) => t.name === toolCall.name)
        if (tool) {
          const result = await tool.invoke(toolCall.args)
          console.log(`  📤 结果: ${result}\n`)

          messages.push(
            new ToolMessage({
              content: result,
              tool_call_id: toolCall.id!,
            })
          )
        }
      }
    }
  }
}

// 3. 测试
async function main() {
  const assistant = new WeatherAssistant()

  console.log('🌤️ 智能天气助手\n')
  console.log('='.repeat(60))

  console.log('\n测试 1：查询天气')
  console.log('-'.repeat(60))
  console.log('👤 用户: 北京今天天气怎么样？\n')
  const answer1 = await assistant.chat('北京今天天气怎么样？')
  console.log(`💬 最终回答: ${answer1}`)

  console.log('\n' + '='.repeat(60))
  console.log('测试 2：查询时间')
  console.log('-'.repeat(60))
  console.log('👤 用户: 现在几点了？\n')
  const answer2 = await assistant.chat('现在几点了？')
  console.log(`💬 最终回答: ${answer2}`)

  console.log('\n' + '='.repeat(60))
  console.log('测试 3：普通问答（不需要工具）')
  console.log('-'.repeat(60))
  console.log('👤 用户: 什么是 React？\n')
  const answer3 = await assistant.chat('什么是 React？')
  console.log(`💬 最终回答: ${answer3}`)

  console.log('\n' + '='.repeat(60))
  console.log('✅ AI 能自动判断何时需要调用工具')
}

main().catch(console.error)
