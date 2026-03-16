import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import 'dotenv/config'

/**
 * 情感分析
 * 文本分类和情感分析
 */

async function sentimentAnalysis() {
  console.log('😊 情感分析演示\n')
  console.log('='.repeat(60))

  const sentimentSchema = z.object({
    category: z.enum(['positive', 'negative', 'neutral']).describe('情感分类'),
    confidence: z.number().min(0).max(1).describe('置信度（0-1）'),
    keywords: z.array(z.string()).describe('关键词列表'),
  })

  const llm = new ChatOpenAI({
    modelName: 'gpt-4o-mini',
  }).withStructuredOutput(sentimentSchema)

  const reviews = [
    '这个产品太棒了，强烈推荐！',
    '质量很差，不建议购买。',
    '还行吧，没什么特别的。',
  ]

  console.log('\n📝 分析评论：\n')

  for (const review of reviews) {
    console.log(`评论: "${review}"`)
    const result = await llm.invoke(`分析以下评论的情感：\n${review}`)

    const emoji =
      result.category === 'positive' ? '😊' : result.category === 'negative' ? '😞' : '😐'

    console.log(`${emoji} 情感: ${result.category}`)
    console.log(`   置信度: ${(result.confidence * 100).toFixed(0)}%`)
    console.log(`   关键词: ${result.keywords.join(', ')}`)
    console.log()
  }

  console.log('='.repeat(60))
  console.log('✅ 结构化输出让情感分析结果更易用')
}

sentimentAnalysis().catch(console.error)
