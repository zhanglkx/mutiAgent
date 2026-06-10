import { describe, it, expect } from 'vitest';
import { ConversationManager } from './conversation-manager';

describe('ConversationManager', () => {
  it('超过上限时只保留最近 maxTurns 轮（maxTurns*2 条）', () => {
    const manager = new ConversationManager(3);
    for (let i = 0; i < 8; i++) {
      manager.addUserMessage(`u${i}`);
      manager.addAIMessage(`a${i}`);
    }
    expect(manager.getHistoryLength()).toBe(6);
  });

  it('getMessages 包含系统消息：长度 = 历史 + 1', () => {
    const manager = new ConversationManager(2);
    manager.setSystemMessage('你是助手');
    manager.addUserMessage('你好');
    expect(manager.getMessages()).toHaveLength(2);
  });

  it('clear 清空历史但保留系统消息', () => {
    const manager = new ConversationManager();
    manager.setSystemMessage('你是助手');
    manager.addUserMessage('你好');
    manager.clear();
    expect(manager.getHistoryLength()).toBe(0);
    expect(manager.getMessages()).toHaveLength(1);
  });
});
