// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/**
 * 单一 ESLint Flat Config（ESLint 10 + typescript-eslint 8）。
 * 取代旧的 .eslintrc.json / .eslintrc.js。
 * 采用「类型感知 lint」(type-checked)，由 projectService 自动发现各 workspace 的 tsconfig。
 */
export default tseslint.config(
  // 全局忽略：构建产物、依赖、覆盖率、各类 JS 配置脚本
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/*.config.js',
      '**/*.config.mjs',
      'eslint.config.js',
      'format.js',
    ],
  },

  // 基线推荐规则
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // 类型信息来源：projectService 自动定位最近的 tsconfig
  {
    languageOptions: {
      parserOptions: {
        // 根级 *.config.ts（如 vitest.config.ts）不属于任何 tsconfig，
        // 用 allowDefaultProject 让其使用推断的默认项目。
        projectService: {
          allowDefaultProject: ['*.config.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // 项目规则（企业级：禁 any / 非空断言 / 浮空 Promise）
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // LLM 返回内容类型较宽松，模板插值/unsafe 系列降为 warn，避免淹没真正错误
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
    },
  },

  // 测试文件放宽
  {
    files: ['**/*.{test,spec}.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // 关闭与 Prettier 冲突的格式化规则（必须放最后）
  eslintConfigPrettier
);
