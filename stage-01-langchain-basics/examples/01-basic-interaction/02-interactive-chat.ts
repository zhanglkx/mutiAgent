import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages'
import * as readline from 'readline'
import 'dotenv/config'

/**
 * 交互式聊天程序
 * 功能：命令行版 ChatGPT
 * 使用 DeepSeek 模型
 */

// 初始化模型
const llm = new ChatOpenAI({
  modelName: 'deepseek-chat',
  temperature: 0.7,
  configuration: {
    baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
  },
})

// 对话历史（类似 React 的 state）
const conversationHistory: any[] = [
  new SystemMessage('你是一个友好的 AI 助手，用简洁的语言回答问题。'),
]

// 创建命令行输入接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// 工具函数：获取用户输入
function askQuestion(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer)
    })
  })
}

// 主函数
async function main() {
  console.log('🤖 AI 助手已启动！输入 "quit" 退出\n')

  while (true) {
    // 获取用户输入
    const userInput = await askQuestion('👤 你: ')

    if (userInput.toLowerCase() === 'quit') {
      console.log('👋 再见！')
      rl.close()
      break
    }

    // 添加用户消息到历史
    conversationHistory.push(new HumanMessage(userInput))

    // 调用模型
    const response = await llm.invoke(conversationHistory)

    // 添加 AI 回复到历史
    conversationHistory.push(new AIMessage(response.content as string))

    // 打印回复
    console.log(`\n🤖 AI: ${response.content}\n`)

    // 可选：查看 token 使用情况
    const tokenUsage = response.response_metadata.tokenUsage
    console.log(`💰 Token 使用: ${tokenUsage.totalTokens}\n`)
  }
}

main().catch(console.error)
