import 'dotenv/config';
import { createChatModel } from '@ai-agent/shared';

/**
 * 流式输出演示
 * 实现类似 ChatGPT 的逐字输出效果（使用 DeepSeek 模型）。
 */
async function streamingDemo() {
  const llm = createChatModel({ temperature: 0.7 });

  console.log('🌊 流式输出演示\n');
  console.log('问题：用 100 字介绍 React 的核心特性\n');
  console.log('AI 回复：');
  console.log('-'.repeat(60));

  const stream = await llm.stream('用 100 字介绍 React 的核心特性');

  // 逐字打印
  for await (const chunk of stream) {
    process.stdout.write(chunk.content as string);
  }

  console.log('\n' + '-'.repeat(60));
  console.log('\n✅ 流式输出完成');
}

streamingDemo().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
