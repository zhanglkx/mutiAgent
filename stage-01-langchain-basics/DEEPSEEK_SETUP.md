# 🚀 DeepSeek 快速配置指南

## ✅ 已完成配置

你的 DeepSeek API Key 已经配置好了！

```
API Key: sk-bf15542f9b6d4118ac7c2efa8919b3f9
Base URL: https://api.deepseek.com
```

## 📝 配置文件位置

- `.env` - 你的配置文件（已包含 API Key）
- `.env.example` - 模板文件

## 🎯 立即开始

### 1. 安装依赖（如果还没有）

```bash
pnpm install
```

### 2. 运行第一个示例

```bash
npx tsx stage-01-langchain-basics/examples/01-basic-interaction/01-hello-ai.ts
```

你应该看到 DeepSeek 的回复！

### 3. 运行测试脚本

```bash
./test-deepseek.sh
```

## 📚 已适配 DeepSeek 的示例

### 第01章（已全部适配）
- ✅ `01-hello-ai.ts` - 第一个 AI 程序
- ✅ `02-interactive-chat.ts` - 交互式聊天
- ✅ `03-temperature-demo.ts` - Temperature 参数
- ✅ `04-streaming.ts` - 流式输出

### 其他章节
其他章节的示例使用相同的配置方式，只需确保 `.env` 文件中有 DeepSeek 配置即可。

## 🔧 使用技巧

### 在代码中使用 DeepSeek

```typescript
import { ChatOpenAI } from '@langchain/openai'
import 'dotenv/config'

const llm = new ChatOpenAI({
  modelName: 'deepseek-chat',
  temperature: 0.7,
  configuration: {
    baseURL: process.env.DEEPSEEK_BASE_URL,
    apiKey: process.env.DEEPSEEK_API_KEY,
  },
})
```

### 使用配置工具（更简单）

```typescript
import { createDeepSeekChat } from './stage-01-langchain-basics/examples/deepseek-config'

const llm = createDeepSeekChat({
  temperature: 0.7,
  maxTokens: 2000,
})
```

## 💰 价格优势

DeepSeek 的价格约为 OpenAI 的 1/10：

| 模型 | 价格（百万tokens） |
|------|------------------|
| DeepSeek | ￥1 |
| GPT-4o-mini | $0.15 (约￥1) |
| GPT-4 | $30 (约￥216) |

## 🌟 DeepSeek 优势

1. **价格实惠** - 成本低
2. **中文优化** - 中文理解能力强
3. **响应快速** - 国内访问速度快
4. **代码能力强** - 特别是 deepseek-coder 模型

## 📖 推荐模型

- **deepseek-chat** - 通用对话（推荐日常使用）
- **deepseek-coder** - 代码生成（推荐编程任务）

## 🔄 切换模型

要切换到代码模型：

```typescript
const llm = new ChatOpenAI({
  modelName: 'deepseek-coder', // 改成代码模型
  temperature: 0.3, // 代码生成用低温度
  configuration: {
    baseURL: process.env.DEEPSEEK_BASE_URL,
    apiKey: process.env.DEEPSEEK_API_KEY,
  },
})
```

## ❓ 常见问题

### Q: 如何获取更多 API Key？

A: 访问 https://platform.deepseek.com/

### Q: DeepSeek 支持哪些功能？

A: 
- ✅ 基础对话
- ✅ 流式输出
- ✅ Function Calling
- ✅ 结构化输出
- ✅ 多轮对话

### Q: 遇到错误怎么办？

检查：
1. API Key 是否正确
2. 网络连接是否正常
3. `.env` 文件是否在项目根目录

## 📞 获取帮助

- [DeepSeek 使用指南](./DEEPSEEK_GUIDE.md)
- [项目 README](./README.md)
- [快速开始](./QUICK_START.md)

---

**配置完成！开始你的 AI 之旅吧！** 🎉
