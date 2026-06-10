import { defineConfig } from 'vitest/config';

/**
 * 根级 Vitest 配置。
 * 仅覆盖纯函数 / 业务逻辑单测，不调用真实 LLM API。
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'shared/src/**',
        'stage-01-langchain-basics/project/src/**',
        'stage-01-langchain-basics/examples/**/*.ts',
      ],
      exclude: ['**/*.{test,spec}.ts', '**/dist/**'],
    },
  },
});
