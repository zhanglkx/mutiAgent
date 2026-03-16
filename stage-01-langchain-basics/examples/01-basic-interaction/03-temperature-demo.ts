import { ChatOpenAI } from '@langchain/openai'
import 'dotenv/config'

/**
 * Temperature 参数演示
 * 展示不同 temperature 值对输出的影响
 */

async function testTemperature() {
  const prompt = '写一句关于春天的诗'

  console.log('🎯 测试 Temperature 参数\n')
  console.log('提示词：', prompt)
  console.log('='.repeat(60))

  // Temperature = 0（确定性输出）
  console.log('\n📍 Temperature = 0 (确定性输出)')
  console.log('-'.repeat(60))
  const llm0 = new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    temperature: 0,
  })

  for (let i = 1; i <= 3; i++) {
    const response = await llm0.invoke(prompt)
    console.log(`第 ${i} 次: ${response.content}`)
  }

  // Temperature = 0.7（平衡输出）
  console.log('\n📍 Temperature = 0.7 (平衡输出)')
  console.log('-'.repeat(60))
  const llm07 = new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    temperature: 0.7,
  })

  for (let i = 1; i <= 3; i++) {
    const response = await llm07.invoke(prompt)
    console.log(`第 ${i} 次: ${response.content}`)
  }

  // Temperature = 1.0（创造性输出）
  console.log('\n📍 Temperature = 1.0 (创造性输出)')
  console.log('-'.repeat(60))
  const llm10 = new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    temperature: 1.0,
  })

  for (let i = 1; i <= 3; i++) {
    const response = await llm10.invoke(prompt)
    console.log(`第 ${i} 次: ${response.content}`)
  }

  console.log('\n' + '='.repeat(60))
  console.log('💡 总结：')
  console.log('- Temperature = 0: 输出一致，适合需要准确答案的场景')
  console.log('- Temperature = 0.7: 输出多样但可控，适合日常对话')
  console.log('- Temperature = 1.0: 输出创意十足，适合创作任务')
}

testTemperature().catch(console.error)
