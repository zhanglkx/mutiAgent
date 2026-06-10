import { describe, it, expect } from 'vitest';
import { loadEnv } from './env';

describe('loadEnv', () => {
  it('合法环境：返回传入的 key 并填充默认 model', () => {
    const env = loadEnv({ DEEPSEEK_API_KEY: 'sk-test' });
    expect(env.DEEPSEEK_API_KEY).toBe('sk-test');
    expect(env.DEEPSEEK_MODEL).toBe('deepseek-chat');
  });

  it('支持覆盖 DEEPSEEK_MODEL', () => {
    const env = loadEnv({
      DEEPSEEK_API_KEY: 'sk-test',
      DEEPSEEK_MODEL: 'deepseek-reasoner',
    });
    expect(env.DEEPSEEK_MODEL).toBe('deepseek-reasoner');
  });

  it('缺少 DEEPSEEK_API_KEY 时抛出包含字段名的可读错误', () => {
    expect(() => loadEnv({})).toThrowError(/DEEPSEEK_API_KEY/);
  });

  it('DEEPSEEK_API_KEY 为空字符串时抛出校验失败', () => {
    expect(() => loadEnv({ DEEPSEEK_API_KEY: '' })).toThrowError(/环境变量校验失败/);
  });
});
