import 'dotenv/config';
import { createChatModel } from '@ai-agent/shared';
import { sentimentSchema } from './schemas';

/**
 * 情感分析：文本分类与情感分析（使用 DeepSeek 模型）。
 */
async function sentimentAnalysis() {
  console.log('😊 情感分析演示\n');
  console.log('='.repeat(60));

  const llm = createChatModel({ temperature: 0 }).withStructuredOutput(sentimentSchema);

  const reviews = [
    '这个产品太棒了，强烈推荐！',
    '质量很差，不建议购买。',
    '还行吧，没什么特别的。',
  ];

  console.log('\n📝 分析评论：\n');

  for (const review of reviews) {
    console.log(`评论: "${review}"`);
    const result = await llm.invoke(`请分析以下评论的情感：${review}`);

    const emoji =
      result.category === 'positive' ? '😊' : result.category === 'negative' ? '😞' : '😐';

    console.log(`${emoji} 情感: ${result.category}`);
    console.log(`   置信度: ${(result.confidence * 100).toFixed(0)}%`);
    console.log(`   关键词: ${result.keywords.join(', ')}`);
    console.log();
  }

  console.log('='.repeat(60));
  console.log('✅ 结构化输出让情感分析结果更易用');
}

sentimentAnalysis().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
