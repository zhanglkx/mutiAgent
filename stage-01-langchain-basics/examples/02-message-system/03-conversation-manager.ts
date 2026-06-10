import 'dotenv/config';
import { createChatModel } from '@ai-agent/shared';
import { ConversationManager } from './conversation-manager';

/**
 * 滑动窗口管理对话历史的演示（使用 DeepSeek 模型）。
 * 复用 conversation-manager.ts 中的 ConversationManager。
 */
async function main() {
  const llm = createChatModel();
  const manager = new ConversationManager(3); // 只保留 3 轮对话

  manager.setSystemMessage('你是一个简洁的助手');

  console.log('🔄 对话历史管理演示\n');
  console.log('设置：最多保留 3 轮对话（6 条消息）\n');
  console.log('='.repeat(60));

  for (let i = 0; i < 8; i++) {
    console.log(`\n第 ${i + 1} 轮对话`);
    console.log('-'.repeat(60));

    manager.addUserMessage(`这是第 ${i + 1} 条消息`);
    const response = await llm.invoke(manager.getMessages());
    manager.addAIMessage(response.content as string);

    console.log(`历史消息数量: ${manager.getHistoryLength()}`);
    console.log(`用户: 这是第 ${i + 1} 条消息`);
    console.log(`AI: ${response.content as string}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ 最终历史消息数量: ${manager.getHistoryLength()} 条`);
  console.log('💡 成功控制了内存使用，避免 token 消耗过大');
}

main().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
