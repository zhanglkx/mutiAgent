import { describe, it, expect } from 'vitest';
import { safeEvaluate } from './calculator';

describe('safeEvaluate', () => {
  it('正确计算加减乘除与括号', () => {
    expect(safeEvaluate('(100+200)*3')).toBe(900);
    expect(safeEvaluate('100+200')).toBe(300);
    expect(safeEvaluate('10 / 4')).toBe(2.5);
    expect(safeEvaluate('2 + 3 * 4')).toBe(14);
  });

  it('支持一元负号与小数', () => {
    expect(safeEvaluate('-5 + 3')).toBe(-2);
    expect(safeEvaluate('1.5 * 2')).toBe(3);
  });

  it('安全拒绝恶意/非法输入（不执行任意代码）', () => {
    expect(() => safeEvaluate('process.exit(1)')).toThrow();
    expect(() => safeEvaluate('1 + abc')).toThrow();
    expect(() => safeEvaluate('console.log(1)')).toThrow();
    expect(() => safeEvaluate('')).toThrow();
  });

  it('除以 0 抛出错误', () => {
    expect(() => safeEvaluate('1/0')).toThrow(/除数/);
  });
});
