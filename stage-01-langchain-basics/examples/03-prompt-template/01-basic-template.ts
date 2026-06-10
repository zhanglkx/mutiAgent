import 'dotenv/config';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createChatModel } from '@ai-agent/shared';

/**
 * 基础模板使用：演示 Prompt Template 的基本功能（使用 DeepSeek 模型）。
 */
async function basicTemplateDemo() {
  const llm = createChatModel();

  console.log('📝 Prompt Template 基础演示\n');
  console.log('='.repeat(60));

  // 1. 简单字符串模板
  console.log('\n1️⃣ 字符串模板');
  console.log('-'.repeat(60));

  const template = ChatPromptTemplate.fromMessages([
    ['system', '你是一个 {role} 专家。'],
    ['human', '{question}'],
  ]);

  const prompt1 = await template.formatMessages({
    role: 'React',
    question: '如何使用 useState？',
  });
  const response1 = await llm.invoke(prompt1);
  console.log('问题：如何使用 useState？');
  console.log('AI 回复：', (response1.content as string).substring(0, 100) + '...');

  // 2. 同一模板，不同变量
  console.log('\n2️⃣ 模板复用');
  console.log('-'.repeat(60));

  const prompt2 = await template.formatMessages({
    role: 'Vue',
    question: '如何使用 ref？',
  });
  const response2 = await llm.invoke(prompt2);
  console.log('问题：如何使用 ref？');
  console.log('AI 回复：', (response2.content as string).substring(0, 100) + '...');

  // 3. 多变量模板
  console.log('\n3️⃣ 多变量模板');
  console.log('-'.repeat(60));

  const multiVarTemplate = ChatPromptTemplate.fromMessages([
    ['system', '你是一个 {role} 助手，回答要 {style}。'],
    ['human', '{question}'],
  ]);

  const prompt3 = await multiVarTemplate.formatMessages({
    role: '前端开发',
    style: '简洁专业',
    question: '解释闭包',
  });
  const response3 = await llm.invoke(prompt3);
  console.log('问题：解释闭包');
  console.log('AI 回复：', (response3.content as string).substring(0, 100) + '...');

  console.log('\n' + '='.repeat(60));
  console.log('✅ Prompt Template 让代码更加可维护和可复用');
}

basicTemplateDemo().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
