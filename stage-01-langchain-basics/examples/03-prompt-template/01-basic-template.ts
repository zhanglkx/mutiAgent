import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import 'dotenv/config'

/**
 * 基础模板使用
 * 演示 Prompt Template 的基本功能
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

async function basicTemplateDemo() {
  // 使用 DeepSeek 模型替代 gpt-4o-mini
  const llm = new ChatOpenAI({
    modelName: 'deepseek-chat',
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
  })

  console.log('📝 Prompt Template 基础演示\n')
  console.log('='.repeat(60))

  // 1. 简单字符串模板
  console.log('\n1️⃣ 字符串模板')
  console.log('-'.repeat(60))

  const template = ChatPromptTemplate.fromMessages([
    ['system', '你是一个 {role} 专家。'],
    ['human', '{question}'],
  ])

  // 复用模板，只改变量
  const prompt1 = await template.formatMessages({
    role: 'React',
    question: '如何使用 useState？',
  })

  const response1 = await llm.invoke(prompt1)
  console.log('问题：如何使用 useState？')
  console.log('AI 回复：', response1.content.toString().substring(0, 100) + '...')

  // 2. 同一模板，不同变量
  console.log('\n2️⃣ 模板复用')
  console.log('-'.repeat(60))

  const prompt2 = await template.formatMessages({
    role: 'Vue',
    question: '如何使用 ref？',
  })

  const response2 = await llm.invoke(prompt2)
  console.log('问题：如何使用 ref？')
  console.log('AI 回复：', response2.content.toString().substring(0, 100) + '...')

  // 3. 多变量模板
  console.log('\n3️⃣ 多变量模板')
  console.log('-'.repeat(60))

  const multiVarTemplate = ChatPromptTemplate.fromMessages([
    ['system', '你是一个 {role} 助手，回答要 {style}。'],
    ['human', '{question}'],
  ])

  const prompt3 = await multiVarTemplate.formatMessages({
    role: '前端开发',
    style: '简洁专业',
    question: '解释闭包',
  })

  const response3 = await llm.invoke(prompt3)
  console.log('问题：解释闭包')
  console.log('AI 回复：', response3.content.toString().substring(0, 100) + '...')

  console.log('\n' + '='.repeat(60))
  console.log('✅ Prompt Template 让代码更加可维护和可复用')
}

basicTemplateDemo().catch(console.error)
