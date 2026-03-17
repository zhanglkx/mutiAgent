import { ChatOpenAI } from '@langchain/openai'
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
  ToolMessage,
} from '@langchain/core/messages'
import 'dotenv/config'

/**
 * 四种消息类型演示
 * SystemMessage, HumanMessage, AIMessage, ToolMessage
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

async function demonstrateMessageTypes() {
  // 使用 DeepSeek 模型替代 gpt-4o-mini
  const llm = new ChatOpenAI({
    modelName: 'deepseek-chat',
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
  })

  console.log('📝 LangChain 四种核心消息类型\n')
  console.log('='.repeat(60))

  // 1. SystemMessage - 系统指令（全局配置）
  console.log('\n1️⃣ SystemMessage - 系统指令')
  console.log('-'.repeat(60))
  const systemMsg = new SystemMessage('你是一个专业的前端工程师助手')
  console.log('用途：定义 AI 的角色和行为规则')
  console.log('示例：', systemMsg.content)

  // 2. HumanMessage - 用户消息
  console.log('\n2️⃣ HumanMessage - 用户消息')
  console.log('-'.repeat(60))
  const humanMsg = new HumanMessage('如何使用 useState？')
  console.log('用途：用户的问题或指令')
  console.log('示例：', humanMsg.content)

  // 3. AIMessage - AI 回复
  console.log('\n3️⃣ AIMessage - AI 回复')
  console.log('-'.repeat(60))
  const aiMsg = new AIMessage('useState 是 React 的状态管理 Hook...')
  console.log('用途：模型的响应内容')
  console.log('示例：', aiMsg.content)

  // 4. ToolMessage - 工具执行结果
  console.log('\n4️⃣ ToolMessage - 工具执行结果')
  console.log('-'.repeat(60))
  const toolMsg = new ToolMessage({
    content: '当前天气：25°C，晴天',
    tool_call_id: 'call_123',
  })
  console.log('用途：函数调用的返回结果')
  console.log('示例：', toolMsg.content)

  // 实际对话示例
  console.log('\n' + '='.repeat(60))
  console.log('💬 完整对话示例\n')

  const messages = [
    new SystemMessage('你是一个 React 专家'),
    new HumanMessage('什么是 Virtual DOM？'),
  ]

  const response = await llm.invoke(messages)
  console.log('问题：', messages[1].content)
  console.log('\nAI 回复：', response.content)
}

demonstrateMessageTypes().catch(console.error)
