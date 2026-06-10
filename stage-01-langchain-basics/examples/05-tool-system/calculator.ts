/**
 * 安全的四则运算求值器。
 *
 * 用递归下降解析器实现，**不使用 eval / Function**，从根本上避免代码注入。
 * 支持：加减乘除、括号、小数、一元正负号。
 *
 * @throws 当表达式非法（含字母、非法字符、括号不匹配、除以 0 等）时抛出错误。
 */
export function safeEvaluate(expression: string): number {
  const src = expression.replace(/\s+/g, '');
  let pos = 0;

  const peek = (): string => src[pos] ?? '';

  function parseExpression(): number {
    let value = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = src[pos++];
      const rhs = parseTerm();
      value = op === '+' ? value + rhs : value - rhs;
    }
    return value;
  }

  function parseTerm(): number {
    let value = parseFactor();
    while (peek() === '*' || peek() === '/') {
      const op = src[pos++];
      const rhs = parseFactor();
      if (op === '/' && rhs === 0) {
        throw new Error('除数不能为 0');
      }
      value = op === '*' ? value * rhs : value / rhs;
    }
    return value;
  }

  function parseFactor(): number {
    if (peek() === '+') {
      pos++;
      return parseFactor();
    }
    if (peek() === '-') {
      pos++;
      return -parseFactor();
    }
    if (peek() === '(') {
      pos++;
      const value = parseExpression();
      if (peek() !== ')') {
        throw new Error('括号不匹配');
      }
      pos++;
      return value;
    }
    return parseNumber();
  }

  function parseNumber(): number {
    const start = pos;
    while (/[0-9.]/.test(peek())) {
      pos++;
    }
    const numStr = src.slice(start, pos);
    if (!/^\d*\.?\d+$/.test(numStr)) {
      throw new Error(`非法字符或数字: "${src.slice(start) || peek()}"`);
    }
    return Number(numStr);
  }

  if (src === '') {
    throw new Error('表达式为空');
  }
  const result = parseExpression();
  if (pos !== src.length) {
    throw new Error(`无法解析的字符: "${src.slice(pos)}"`);
  }
  if (!Number.isFinite(result)) {
    throw new Error('计算结果非有限数');
  }
  return result;
}
