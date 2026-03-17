# 📦 依赖版本说明

## 当前使用版本（2026-03-16 更新）

### 核心依赖

| 包名                 | 版本    | 说明                     |
| -------------------- | ------- | ------------------------ |
| langchain            | ^1.2.32 | LangChain 核心库         |
| @langchain/openai    | ^1.2.13 | OpenAI 集成              |
| @langchain/anthropic | ^1.3.23 | Anthropic Claude 集成    |
| @langchain/core      | ^1.1.32 | LangChain 核心类型和工具 |
| zod                  | ^4.3.6  | TypeScript 数据验证      |
| dotenv               | ^16.4.5 | 环境变量管理             |

### 开发依赖

| 包名        | 版本     | 说明              |
| ----------- | -------- | ----------------- |
| typescript  | ^5.7.3   | TypeScript 编译器 |
| tsx         | ^4.19.2  | TypeScript 执行器 |
| @types/node | ^22.10.7 | Node.js 类型定义  |

## 安装方式

### 使用 pnpm（推荐）

```bash
pnpm install
```

### 使用 npm

```bash
npm install
```

### 使用 yarn

```bash
yarn install
```

## 版本要求

- **Node.js**: >= 20.0.0
- **pnpm**: >= 8.0.0（如果使用 pnpm）

## 更新依赖

### 检查过期的依赖

```bash
pnpm outdated
```

### 更新所有依赖到最新版本

```bash
pnpm up --latest
```

### 更新特定依赖

```bash
pnpm up langchain@latest @langchain/openai@latest
```

## 版本兼容性

- 所有 `@langchain/*` 包版本保持一致，确保兼容性
- Zod 4.x 与 LangChain 最新版本完全兼容
- TypeScript 5.7+ 提供更好的类型推断支持

## 注意事项

1. **Breaking Changes**: 从旧版本升级时，请查看各包的 CHANGELOG
2. **API 变化**: LangChain 1.x 相比 0.x 有较大 API 变化
3. **类型安全**: 建议使用最新版本的 TypeScript 获得最佳体验

## 版本更新日志

### 2026-03-16

- ✅ 更新所有依赖到最新稳定版本
- ✅ langchain: 0.1.0 → 1.2.32
- ✅ @langchain/openai: 0.0.19 → 1.2.13
- ✅ @langchain/anthropic: 0.1.0 → 1.3.23
- ✅ @langchain/core: 0.1.0 → 1.1.32
- ✅ zod: 3.22.4 → 4.3.6
- ✅ typescript: 5.3.3 → 5.7.3
- ✅ tsx: 4.7.0 → 4.19.2
- ✅ @types/node: 20.11.0 → 22.10.7

## 相关链接

- [LangChain.js 更新日志](https://github.com/langchain-ai/langchainjs/releases)
- [OpenAI 包更新日志](https://github.com/langchain-ai/langchainjs/tree/main/libs/langchain-openai)
- [Anthropic 包更新日志](https://github.com/langchain-ai/langchainjs/tree/main/libs/langchain-anthropic)
- [Zod 文档](https://zod.dev/)
- [TypeScript 更新日志](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)
