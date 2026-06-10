import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ChatDeepSeek } from '@langchain/deepseek';
import { createChatModel, createReasoner } from './model';

describe('createChatModel', () => {
  const original = process.env.DEEPSEEK_API_KEY;

  beforeEach(() => {
    process.env.DEEPSEEK_API_KEY = 'sk-test';
  });

  afterEach(() => {
    if (original === undefined) {
      delete process.env.DEEPSEEK_API_KEY;
    } else {
      process.env.DEEPSEEK_API_KEY = original;
    }
  });

  it('默认返回 deepseek-chat 且 temperature 为 0.7', () => {
    const llm = createChatModel();
    expect(llm).toBeInstanceOf(ChatDeepSeek);
    expect(llm.model).toBe('deepseek-chat');
    expect(llm.temperature).toBe(0.7);
  });

  it('尊重传入的 model 与 temperature', () => {
    const llm = createChatModel({ model: 'deepseek-coder', temperature: 0 });
    expect(llm.model).toBe('deepseek-coder');
    expect(llm.temperature).toBe(0);
  });

  it('createReasoner 使用 deepseek-reasoner', () => {
    const llm = createReasoner();
    expect(llm.model).toBe('deepseek-reasoner');
  });

  it('缺少 API Key 时抛出可读错误', () => {
    delete process.env.DEEPSEEK_API_KEY;
    expect(() => createChatModel()).toThrowError(/DEEPSEEK_API_KEY/);
  });
});
