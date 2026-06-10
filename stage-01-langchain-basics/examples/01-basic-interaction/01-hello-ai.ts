import 'dotenv/config';
import { createChatModel } from '@ai-agent/shared';

/**
 * 第一个 AI 程序：简单对话
 * 就像调用 fetch API 一样简单！
 *
 * 使用 DeepSeek 模型（通过 @langchain/deepseek 官方集成）。
 */
async function main() {
  // 1. 通过共享工厂创建模型（内部自动校验环境变量、无需再写 apiKey/baseURL）
  const llm = createChatModel({ maxTokens: 500 });

  // 2. 发送消息（就像 fetch 请求）
  const response = await llm.invoke('用一句话介绍什么是 AI Agent');

  // 3. 打印结果
  console.log('🤖 AI 回复：');
  console.log(response.content);

  // 4. 查看标准化的 token 用量（跨厂商统一字段：usage_metadata）
  console.log('\n📊 Token 使用：', response.usage_metadata?.total_tokens ?? '未知');
}

main().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
