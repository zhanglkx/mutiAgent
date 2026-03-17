import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import 'dotenv/config';

/**
 * 情感分析
 * 文本分类和情感分析
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

async function sentimentAnalysis() {
  console.log('😊 情感分析演示\n');
  console.log('='.repeat(60));

  const sentimentSchema = z.object({
    category: z.enum(['positive', 'negative', 'neutral']).describe('情感分类'),
    confidence: z.number().min(0).max(1).describe('置信度（0-1）'),
    keywords: z.array(z.string()).describe('关键词列表'),
  });

  const llm = new ChatOpenAI({
    modelName: 'deepseek-chat',
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
    temperature: 0,
  });

  // 创建 JSON 模板提示
  const prompt = `请分析以下评论的情感，并以 JSON 格式返回：

评论：
{review}

请按照以下结构返回 JSON：
{
  "category": "情感分类（positive/negative/neutral）",
  "confidence": "置信度（0-1之间的数字）",
  "keywords": ["关键词列表"]
}

返回纯 JSON，不要有额外的文本或解释。`;

  const reviews = [
    '这个产品太棒了，强烈推荐！',
    '质量很差，不建议购买。',
    '还行吧，没什么特别的。',
  ];

  console.log('\n📝 分析评论：\n');

  for (const review of reviews) {
    console.log(`评论: "${review}"`);
    const result = await llm.invoke(prompt.replace('{review}', review));

    // 解析 JSON 并进行类型检查
    const parsedResult = JSON.parse(result.content);

    const emoji =
      parsedResult.category === 'positive'
        ? '😊'
        : parsedResult.category === 'negative'
          ? '😞'
          : '😐';

    console.log(`${emoji} 情感: ${parsedResult.category}`);
    console.log(`   置信度: ${(parsedResult.confidence * 100).toFixed(0)}%`);
    console.log(`   关键词: ${parsedResult.keywords.join(', ')}`);
    console.log();
  }

  console.log('='.repeat(60));
  console.log('✅ 结构化输出让情感分析结果更易用');
}

sentimentAnalysis().catch(console.error);
