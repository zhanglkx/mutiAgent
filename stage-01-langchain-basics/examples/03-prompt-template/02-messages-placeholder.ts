import 'dotenv/config';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { createChatModel } from '@ai-agent/shared';

/**
 * MessagesPlaceholder 演示：在模板中插入历史对话（类似 React 的 children）。
 * 使用 DeepSeek 模型。
 */
async function messagesPlaceholderDemo() {
  const llm = createChatModel();

  console.log('🔄 MessagesPlaceholder 演示\n');
  console.log('='.repeat(60));

  // 创建包含历史对话占位符的模板
  const template = ChatPromptTemplate.fromMessages([
    ['system', '你是一个有记忆的助手。'],
    new MessagesPlaceholder('chat_history'), // 👈 历史对话插入点
    ['human', '{input}'],
  ]);

  // 模拟历史对话
  const history = [
    new HumanMessage('我叫小明'),
    new AIMessage('你好，小明！很高兴认识你。'),
    new HumanMessage('我今年25岁'),
    new AIMessage('好的，小明。你今年25岁。'),
  ];

  console.log('\n📚 对话历史：');
  for (const msg of history) {
    const role = msg instanceof HumanMessage ? '👤 用户' : '🤖 AI';
    console.log(`${role}: ${msg.content as string}`);
  }

  // 新问题
  console.log('\n❓ 新问题：');
  console.log('👤 用户: 我叫什么名字，今年多大？');

  const messages = await template.formatMessages({
    chat_history: history,
    input: '我叫什么名字，今年多大？',
  });

  const response = await llm.invoke(messages);
  console.log('\n💡 AI 回复：');
  console.log(`🤖 AI: ${response.content as string}`);

  console.log('\n' + '='.repeat(60));
  console.log('✅ MessagesPlaceholder 让对话历史管理变得简单');
}

messagesPlaceholderDemo().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
