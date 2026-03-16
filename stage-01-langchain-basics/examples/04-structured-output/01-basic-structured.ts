import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import 'dotenv/config'

/**
 * 基础结构化输出
 * 让 AI 返回标准 JSON，就像调用类型安全的 API
 */

async function basicStructuredOutput() {
  console.log('📊 结构化输出演示\n')
  console.log('='.repeat(60))

  // 1. 定义数据结构（使用 Zod）
  const personSchema = z.object({
    name: z.string().describe('人名'),
    age: z.number().describe('年龄'),
    occupation: z.string().describe('职业'),
  })

  // 2. 让 LLM 支持结构化输出
  const llm = new ChatOpenAI({
    modelName: 'gpt-4o-mini',
  }).withStructuredOutput(personSchema)

  // 3. 调用（返回类型安全的对象！）
  console.log('\n❓ 提取信息：小明今年25岁，是一名前端工程师\n')

  const result = await llm.invoke('小明今年25岁，是一名前端工程师')

  console.log('✅ 结构化输出结果：')
  console.log(JSON.stringify(result, null, 2))

  // TypeScript 自动推断类型！
  console.log('\n💡 类型安全访问：')
  console.log(`name.toUpperCase(): ${result.name.toUpperCase()}`)
  console.log(`age * 2: ${result.age * 2}`)
  console.log(`occupation.length: ${result.occupation.length}`)

  console.log('\n' + '='.repeat(60))
  console.log('✅ 结构化输出让数据提取变得简单可靠')
}

basicStructuredOutput().catch(console.error)
