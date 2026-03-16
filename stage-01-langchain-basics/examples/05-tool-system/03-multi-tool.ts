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
 * 多工具协作
 * 演示：计算器 + 货币转换
 */

// 工具1：计算器
const calculatorTool = tool(
  async ({ expression }) => {
    try {
      const result = eval(expression)
      return `${expression} = ${result}`
    } catch (error) {
      return '计算错误'
    }
  },
  {
    name: 'calculator',
    description: '执行数学计算，支持 +、-、*、/ 等运算',
    schema: z.object({
      expression: z.string().describe('数学表达式，如：2+3*4'),
    }),
  }
)

// 工具2：货币转换
const currencyTool = tool(
  async ({ amount, from, to }) => {
    const rates: Record<string, Record<string, number>> = {
      CNY: { USD: 0.14, EUR: 0.13 },
      USD: { CNY: 7.2, EUR: 0.92 },
      EUR: { CNY: 7.8, USD: 1.09 },
    }

    const rate = rates[from]?.[to] || 1
    const result = amount * rate
    return `${amount} ${from} = ${result.toFixed(2)} ${to}`
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
)

// 助手类
class MultiToolAssistant {
  private llm: ChatOpenAI
  private tools: any[]

  constructor() {
    this.tools = [calculatorTool, currencyTool]

    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
    }).bindTools(this.tools)
  }

  async chat(userInput: string): Promise<string> {
    const messages: BaseMessage[] = [new HumanMessage(userInput)]

    while (true) {
      const response = await this.llm.invoke(messages)
      messages.push(response)

      if (!response.tool_calls || response.tool_calls.length === 0) {
        return response.content as string
      }

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

// 测试
async function main() {
  const assistant = new MultiToolAssistant()

  console.log('🧮 多工具协作演示\n')
  console.log('='.repeat(60))

  console.log('\n测试 1：纯计算')
  console.log('-'.repeat(60))
  console.log('👤 用户: 帮我计算 (100+200)*3\n')
  const answer1 = await assistant.chat('帮我计算 (100+200)*3')
  console.log(`💬 最终回答: ${answer1}`)

  console.log('\n' + '='.repeat(60))
  console.log('测试 2：纯货币转换')
  console.log('-'.repeat(60))
  console.log('👤 用户: 把 500 人民币转换成美元\n')
  const answer2 = await assistant.chat('把 500 人民币转换成美元')
  console.log(`💬 最终回答: ${answer2}`)

  console.log('\n' + '='.repeat(60))
  console.log('测试 3：复合任务（先计算后转换）')
  console.log('-'.repeat(60))
  console.log('👤 用户: 帮我计算 100+200，然后把结果转换成美元\n')
  const answer3 = await assistant.chat('帮我计算 100+200，然后把结果转换成美元')
  console.log(`💬 最终回答: ${answer3}`)

  console.log('\n' + '='.repeat(60))
  console.log('✅ AI 能自动组合多个工具完成复杂任务')
}

main().catch(console.error)
