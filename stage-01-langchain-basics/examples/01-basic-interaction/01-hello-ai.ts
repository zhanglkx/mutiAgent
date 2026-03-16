import { ChatOpenAI } from '@langchain/openai'
import 'dotenv/config'

/**
 * 第一个 AI 程序：简单对话
 * 就像调用 fetch API 一样简单！
 * 
 * 使用 DeepSeek 模型（兼容 OpenAI API）
 */

async function main() {
  // 1. 初始化大模型（类似创建 axios 实例）
  const llm = new ChatOpenAI({
    modelName: 'deepseek-chat', // DeepSeek 的对话模型
    temperature: 0.7,
    maxTokens: 500,
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
  })

  // 2. 发送消息（就像 fetch 请求）
  const response = await llm.invoke('用一句话介绍什么是 AI Agent')

  // 3. 打印结果
  console.log('🤖 AI 回复：')
  console.log(response.content)

  // 4. 查看完整响应对象
  console.log('\n📊 响应元数据：')
  console.log('模型：', response.response_metadata.model_name)
  console.log('Token 使用：', response.response_metadata.tokenUsage)
}

main().catch(console.error)
