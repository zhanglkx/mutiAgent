import { ChatOpenAI } from '@langchain/openai'
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
  BaseMessage,
} from '@langchain/core/messages'
import 'dotenv/config'

/**
 * 滑动窗口管理对话历史
 * 前端类比：类似虚拟列表，只渲染可见部分
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

class ConversationManager {
  private systemMessage: SystemMessage | null = null
  private history: BaseMessage[] = []
  private maxTurns: number

  constructor(maxTurns = 5) {
    this.maxTurns = maxTurns
  }

  setSystemMessage(content: string) {
    this.systemMessage = new SystemMessage(content)
  }

  addUserMessage(content: string) {
    this.history.push(new HumanMessage(content))
    this.trimHistory()
  }

  addAIMessage(content: string) {
    this.history.push(new AIMessage(content))
    this.trimHistory()
  }

  /**
   * 保持历史长度在限制内
   * 类似 React 的 useMemo 优化
   */
  private trimHistory() {
    const maxMessages = this.maxTurns * 2 // 一轮 = 1 Human + 1 AI
    if (this.history.length > maxMessages) {
      this.history = this.history.slice(-maxMessages)
      console.log(`🔄 历史消息已裁剪，保留最近 ${this.maxTurns} 轮对话`)
    }
  }

  /**
   * 获取完整消息列表（用于发送给 LLM）
   */
  getMessages(): BaseMessage[] {
    const messages: BaseMessage[] = []
    if (this.systemMessage) {
      messages.push(this.systemMessage)
    }
    messages.push(...this.history)
    return messages
  }

  clear() {
    this.history = []
  }

  getHistoryLength() {
    return this.history.length
  }
}

// 使用示例
async function main() {
  // 使用 DeepSeek 模型替代 gpt-4o-mini
  const llm = new ChatOpenAI({
    modelName: 'deepseek-chat',
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
  })
  const manager = new ConversationManager(3) // 只保留 3 轮对话

  manager.setSystemMessage('你是一个简洁的助手')

  console.log('🔄 对话历史管理演示\n')
  console.log('设置：最多保留 3 轮对话（6 条消息）\n')
  console.log('='.repeat(60))

  for (let i = 0; i < 8; i++) {
    console.log(`\n第 ${i + 1} 轮对话`)
    console.log('-'.repeat(60))

    manager.addUserMessage(`这是第 ${i + 1} 条消息`)
    const response = await llm.invoke(manager.getMessages())
    manager.addAIMessage(response.content as string)

    console.log(`历史消息数量: ${manager.getHistoryLength()}`)
    console.log(`用户: 这是第 ${i + 1} 条消息`)
    console.log(`AI: ${response.content}`)
  }

  console.log('\n' + '='.repeat(60))
  console.log(`\n✅ 最终历史消息数量: ${manager.getHistoryLength()} 条`)
  console.log('💡 成功控制了内存使用，避免 token 消耗过大')
}

main().catch(console.error)
