import { ChatOpenAI } from '@langchain/openai'
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
  BaseMessage,
} from '@langchain/core/messages'
import 'dotenv/config'

/**
 * 客服机器人示例
 * 演示如何用不同消息类型构建专业对话
 */

const llm = new ChatOpenAI({ modelName: 'gpt-4o-mini' })

// 系统设定：定义角色和规则
const systemPrompt = new SystemMessage(`你是某电商平台的客服机器人。
规则：
1. 礼貌专业，每次回复包含问候语
2. 如果涉及退款，提醒需要提供订单号
3. 回复不超过 100 字
4. 使用 emoji 增加亲和力`)

// 模拟多轮对话
async function main() {
  const conversation: BaseMessage[] = [systemPrompt]

  console.log('🛍️ 电商客服机器人\n')
  console.log('='.repeat(60))

  // 第一轮
  console.log('\n👤 用户: 我的包裹怎么还没到？')
  conversation.push(new HumanMessage('我的包裹怎么还没到？'))
  const response1 = await llm.invoke(conversation)
  console.log(`🤖 客服: ${response1.content}`)
  conversation.push(new AIMessage(response1.content as string))

  // 第二轮
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('\n👤 用户: 订单号是 123456')
  conversation.push(new HumanMessage('订单号是 123456'))
  const response2 = await llm.invoke(conversation)
  console.log(`🤖 客服: ${response2.content}`)
  conversation.push(new AIMessage(response2.content as string))

  // 第三轮
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('\n👤 用户: 那我要退款')
  conversation.push(new HumanMessage('那我要退款'))
  const response3 = await llm.invoke(conversation)
  console.log(`🤖 客服: ${response3.content}`)

  console.log('\n' + '='.repeat(60))
  console.log(`\n📊 对话统计：共 ${conversation.length} 条消息`)
}

main().catch(console.error)
