import { SystemMessage, HumanMessage, AIMessage, type BaseMessage } from '@langchain/core/messages';

/**
 * 滑动窗口对话历史管理器。
 *
 * 前端类比：类似虚拟列表，只保留最近若干轮对话，
 * 从而控制内存占用与发送给 LLM 的 token 数量。
 */
export class ConversationManager {
  private systemMessage: SystemMessage | null = null;
  private history: BaseMessage[] = [];
  private readonly maxTurns: number;

  constructor(maxTurns = 5) {
    this.maxTurns = maxTurns;
  }

  setSystemMessage(content: string): void {
    this.systemMessage = new SystemMessage(content);
  }

  addUserMessage(content: string): void {
    this.history.push(new HumanMessage(content));
    this.trimHistory();
  }

  addAIMessage(content: string): void {
    this.history.push(new AIMessage(content));
    this.trimHistory();
  }

  /** 保持历史长度在限制内（一轮 = 1 条 Human + 1 条 AI）。 */
  private trimHistory(): void {
    const maxMessages = this.maxTurns * 2;
    if (this.history.length > maxMessages) {
      this.history = this.history.slice(-maxMessages);
    }
  }

  /** 获取完整消息列表（含系统消息），用于发送给 LLM。 */
  getMessages(): BaseMessage[] {
    return this.systemMessage ? [this.systemMessage, ...this.history] : [...this.history];
  }

  clear(): void {
    this.history = [];
  }

  getHistoryLength(): number {
    return this.history.length;
  }
}
