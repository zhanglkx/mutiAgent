import 'dotenv/config';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { HumanMessage, SystemMessage, type BaseMessage } from '@langchain/core/messages';
import { createChatModel } from '@ai-agent/shared';

/**
 * 交互式聊天程序（命令行版 ChatGPT），使用 DeepSeek 模型。
 *
 * 关键特性：
 * 1. 持续对话记忆 - 通过 conversationHistory 维护上下文
 * 2. 系统消息设定 - 初始化 AI 助手的人设
 * 3. 实时交互 - 命令行界面，支持多轮对话
 */
const llm = createChatModel({ temperature: 0.7 });

// 对话历史（强类型，不再使用 any[]）
const conversationHistory: BaseMessage[] = [
  new SystemMessage('你是一个友好的 AI 助手，用简洁的语言回答问题。'),
];

const rl = readline.createInterface({ input, output });

async function main() {
  console.log('🤖 AI 助手已启动！输入 "quit" 退出\n');

  for (;;) {
    const userInput = await rl.question('👤 你: ');

    if (userInput.toLowerCase() === 'quit') {
      console.log('👋 再见！');
      rl.close();
      break;
    }

    // 用户消息加入历史
    conversationHistory.push(new HumanMessage(userInput));

    // 调用模型（传入完整历史以保留上下文）
    const response = await llm.invoke(conversationHistory);

    // invoke 返回的就是 AIMessage，直接加入历史（无需重建/类型断言）
    conversationHistory.push(response);

    console.log(`\n🤖 AI: ${response.content as string}\n`);

    // 标准化 token 用量字段，DeepSeek 下安全（可选链兜底，修复原崩溃）
    const totalTokens = response.usage_metadata?.total_tokens ?? 0;
    console.log(`💰 Token 使用: ${totalTokens}\n`);
  }
}

main().catch((error: unknown) => {
  rl.close();
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
