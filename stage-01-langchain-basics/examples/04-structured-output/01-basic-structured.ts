import 'dotenv/config';
import { createChatModel } from '@ai-agent/shared';
import { personSchema } from './schemas';

/**
 * 基础结构化输出
 * 用 withStructuredOutput 让 AI 直接返回类型安全的对象（使用 DeepSeek 模型）。
 * 不再手写 JSON.parse —— 返回值由 Zod Schema 推断类型。
 */
async function basicStructuredOutput() {
  console.log('📊 结构化输出演示\n');
  console.log('='.repeat(60));

  // 绑定 Schema：返回值类型即 z.infer<typeof personSchema>
  const llm = createChatModel({ temperature: 0 }).withStructuredOutput(personSchema);

  console.log('\n❓ 提取信息：小明今年25岁，是一名前端工程师\n');
  const result = await llm.invoke('请从以下文本中提取信息：小明今年25岁，是一名前端工程师');

  console.log('✅ 结构化输出结果：');
  console.log(JSON.stringify(result, null, 2));

  // 类型安全的访问（result.name / age / occupation 都有类型提示）
  console.log('\n💡 验证数据结构：');
  console.log(`name: ${result.name}`);
  console.log(`age: ${result.age}`);
  console.log(`occupation: ${result.occupation}`);

  console.log('\n' + '='.repeat(60));
  console.log('✅ 结构化输出让数据提取变得简单可靠');
}

basicStructuredOutput().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
