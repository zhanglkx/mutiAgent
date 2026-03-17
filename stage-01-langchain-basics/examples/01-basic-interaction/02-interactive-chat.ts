import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import * as readline from 'readline';
import 'dotenv/config';

/**
 * 交互式聊天程序
 * 功能：命令行版 ChatGPT
 * 使用 DeepSeek 模型
 *
 * 关键特性：
 * 1. 持续对话记忆 - 通过 conversationHistory 数组维护对话上下文
 * 2. 系统消息设定 - 初始化 AI 助手的人设和行为准则
 * 3. 实时交互 - 命令行界面，支持持续对话
 */

// ==================== AI 模型初始化 ====================
// 初始化 ChatOpenAI 模型实例，配置 DeepSeek 模型参数
// temperature: 0.7 控制回答的随机性，值越高越有创意
const llm = new ChatOpenAI({
  modelName: 'deepseek-chat', // 使用 DeepSeek Chat 模型
  temperature: 0.7, // 创造性参数，0-2之间，0.7为平衡值
  configuration: {
    baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com', // API 基础 URL
    apiKey: process.env.DEEPSEEK_API_KEY, // 从环境变量获取 API 密钥
  },
});

// ==================== 对话状态管理 ====================
// 对话历史数组，存储所有消息以维持上下文
// 初始系统消息设定 AI 助手的人设和行为准则
const conversationHistory: any[] = [
  new SystemMessage('你是一个友好的 AI 助手，用简洁的语言回答问题。'),
];

// ==================== 命令行界面设置 ====================
// 创建 readline 接口用于处理命令行输入输出
const rl = readline.createInterface({
  input: process.stdin, // 标准输入
  output: process.stdout, // 标准输出
});

// 工具函数：异步获取用户输入
function askQuestion(prompt: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(prompt, answer => {
      resolve(answer);
    });
  });
}

// ==================== 主程序 ====================
async function main() {
  console.log('🤖 AI 助手已启动！输入 "quit" 退出\n');

  while (true) {
    // 获取用户输入
    const userInput = await askQuestion('👤 你: ');

    if (userInput.toLowerCase() === 'quit') {
      console.log('👋 再见！');
      rl.close();
      break;
    }

    // ==================== 用户消息处理 ====================
    // 将用户输入转换为 HumanMessage 并添加到对话历史
    // 这一步很重要，因为模型需要知道这是用户的消息
    conversationHistory.push(new HumanMessage(userInput));

    // ==================== AI 调用核心逻辑 ====================
    // 调用语言模型生成回复
    // 关键点：
    // 1. 传入完整的对话历史，让模型理解上下文
    // 2. 模型会基于所有历史消息生成回复
    // 3. 返回的 response 包含 content 和 metadata
    const response = await llm.invoke(conversationHistory);

    // ==================== AI 回复处理 ====================
    // 将 AI 的回复转换为 AIMessage 并添加到历史
    // 确保对话历史完整性，为下一次交互做准备
    conversationHistory.push(new AIMessage(response.content as string));

    // 打印 AI 回复
    console.log(`\n🤖 AI: ${response.content}\n`);

    console.log(JSON.stringify(conversationHistory, null, 2));

    // 可选：查看 token 使用情况
    // response.response_metadata 包含详细的 token 统计信息
    const tokenUsage = response.response_metadata.tokenUsage;
    console.log(`💰 Token 使用: ${tokenUsage.totalTokens}\n`);
  }
}

main().catch(console.error);
