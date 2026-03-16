# AI Agent 开发完整教程 - 前端开发者专属版

> 🎯 用 TypeScript 构建 AI Agent：LangChain.js + LangGraph.js

## 📚 教程结构

本教程专为**前端开发者**设计，使用 **TypeScript/JavaScript** 和你熟悉的工具链。

### 🟢 第一阶段：LangChain.js 基础 - 给大模型装上"手脚"
**你会用到**：Node.js、TypeScript、熟悉的 async/await

- [x] [01-大模型交互入门](./01-阶段一-LangChain基础/01-大模型交互入门.md) - 像调用 fetch 一样简单
- [x] [02-消息系统详解](./01-阶段一-LangChain基础/02-消息系统详解.md) - 类比 React 的 props
- [x] [03-提示词模板](./01-阶段一-LangChain基础/03-提示词模板.md) - 模板字符串的进阶版
- [x] [04-结构化输出](./01-阶段一-LangChain基础/04-结构化输出.md) - TypeScript 类型验证
- [x] [05-工具系统核心](./01-阶段一-LangChain基础/05-工具系统核心.md) - Function Calling
- [x] [实战项目：智能天气助手](./01-阶段一-LangChain基础/实战项目-智能天气助手/)

### 🔵 第二阶段：LangGraph.js 核心 - 构建有"大脑"的 Agent
**你会用到**：状态管理思维（类似 Redux/Zustand）

- [x] [01-为什么需要LangGraph](./02-阶段二-LangGraph核心/01-为什么需要LangGraph.md)
- [x] [02-状态机概念](./02-阶段二-LangGraph核心/02-状态机概念.md)
- [x] [03-节点与边](./02-阶段二-LangGraph核心/03-节点与边.md)
- [x] [04-条件路由](./02-阶段二-LangGraph核心/04-条件路由.md)
- [x] [05-构建ReAct-Agent](./02-阶段二-LangGraph核心/05-构建ReAct-Agent.md)
- [x] [实战项目：多轮对话任务助手](./02-阶段二-LangGraph核心/实战项目-多轮对话助手/)

### 🟡 第三阶段：LangGraph.js 进阶 - 生产级特性
**你会用到**：IndexedDB、LocalStorage、中间件模式

- [x] [01-持久化与记忆](./03-阶段三-LangGraph进阶/01-持久化与记忆.md)
- [x] [02-人机协同](./03-阶段三-LangGraph进阶/02-人机协同.md)
- [x] [03-状态修改与回退](./03-阶段三-LangGraph进阶/03-状态修改与回退.md)
- [x] [04-错误处理](./03-阶段三-LangGraph进阶/04-错误处理.md)
- [x] [实战项目：审批流程 Agent](./03-阶段三-LangGraph进阶/实战项目-审批流程Agent/)

### 🟣 第四阶段：多智能体系统 - 团队协作
**你会用到**：微前端思维、模块化架构

- [x] [01-多智能体概述](./04-阶段四-多智能体/01-多智能体概述.md)
- [x] [02-主管-员工模式](./04-阶段四-多智能体/02-主管员工模式.md)
- [x] [03-网状对等模式](./04-阶段四-多智能体/03-网状对等模式.md)
- [x] [04-子图嵌套](./04-阶段四-多智能体/04-子图嵌套.md)
- [x] [实战项目：智能客服系统](./04-阶段四-多智能体/实战项目-智能客服系统/)

### 🔴 第五阶段：工程化部署 - 上线生产
**你会用到**：Next.js、React、Vercel 部署

- [x] [01-流式输出](./05-阶段五-工程化部署/01-流式输出.md)
- [x] [02-可观测性](./05-阶段五-工程化部署/02-可观测性.md)
- [x] [03-Next.js集成](./05-阶段五-工程化部署/03-Nextjs集成.md)
- [x] [04-React前端开发](./05-阶段五-工程化部署/04-React前端开发.md)
- [x] [实战项目：完整的 Agent 应用](./05-阶段五-工程化部署/实战项目-完整应用/)

---

## 🎯 学习建议

### 前端开发者的优势：

✅ **你已经会的技能直接迁移**：
- `async/await` → LangChain 的异步调用
- `useState/useReducer` → LangGraph 状态管理
- `React Router` → LangGraph 条件路由
- `TypeScript 类型` → Zod Schema 验证
- `fetch/axios` → LLM API 调用

### 学习节奏（每天 2-3 小时）：

```
Day 1-3:   阶段一 → 熟悉 LangChain.js API
Day 4-6:   阶段二 → 理解状态机和 Agent 循环
Day 7-9:   阶段三 → 掌握持久化和中断机制
Day 10-12: 阶段四 → 构建多智能体系统
Day 13-15: 阶段五 → 部署到 Next.js 应用
```

---

## 🛠️ 环境准备

### 1. Node.js 环境（推荐 v20+）

```bash
# 检查版本
node -v  # 应该 >= v20.0.0
npm -v   # 或使用 pnpm/bun
```

### 2. 创建项目

```bash
# 进入项目目录
cd ~/Documents/AI/mutiAgent

# 初始化 TypeScript 项目
npm init -y
npm install typescript tsx @types/node --save-dev
npx tsc --init
```

### 3. 安装核心依赖

```bash
# LangChain.js 核心库
npm install langchain @langchain/openai @langchain/anthropic

# LangGraph.js（状态管理）
npm install @langchain/langgraph

# 工具库
npm install zod dotenv
```

### 4. 配置环境变量

创建 `.env` 文件：

```bash
# .env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
# 或者使用 Claude（推荐）
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx

# 可选：LangSmith 调试工具
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_xxxxxxxxxxxxx
```

### 5. 配置 TypeScript

修改 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 6. 配置 package.json

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## 📖 快速开始

### 第一个 AI 程序（5分钟）

创建 `src/hello-ai.ts`：

```typescript
import { ChatOpenAI } from '@langchain/openai';
import 'dotenv/config';

// 初始化模型（就像创建 axios 实例）
const llm = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0.7,
});

// 调用模型（就像 fetch 请求）
const response = await llm.invoke('用一句话介绍什么是 AI Agent');

console.log('AI 回复：', response.content);
```

运行：

```bash
npm run dev
```

**就是这么简单！** 🎉

---

## 🌟 为什么选择 TypeScript 版本？

### 对比 Python vs TypeScript

| 特性 | Python (LangChain) | TypeScript (LangChain.js) |
|-----|-------------------|-------------------------|
| **前端集成** | 需要后端 API | 直接在 Next.js 中使用 |
| **类型安全** | 需要 Pydantic | 原生 TypeScript 支持 |
| **生态系统** | AI/ML 丰富 | Web 开发丰富 |
| **部署** | 需要 Python 环境 | Vercel 一键部署 |
| **学习曲线** | 需学 Python 语法 | 零学习成本 |

### 前端开发者的优势

```typescript
// 你已经熟悉的模式直接迁移！

// 1. async/await
const result = await llm.invoke(prompt);

// 2. 泛型类型
const parser = z.object({
  name: z.string(),
  age: z.number(),
});

// 3. 流式处理
for await (const chunk of stream) {
  console.log(chunk);
}

// 4. 错误处理
try {
  await llm.invoke(prompt);
} catch (error) {
  console.error(error);
}
```

---

## 📚 推荐资源

- [LangChain.js 官方文档](https://js.langchain.com/)
- [LangGraph.js 文档](https://langchain-ai.github.io/langgraphjs/)
- [Vercel AI SDK](https://sdk.vercel.ai/)（流式 UI）
- [OpenAI API 文档](https://platform.openai.com/docs)
- [Claude API 文档](https://docs.anthropic.com/)

---

## 💬 开发工具推荐

### VS Code 插件

- **LangChain Snippets** - 代码片段
- **TypeScript Error Translator** - 错误翻译
- **Prettier** - 代码格式化
- **Thunder Client** - API 测试

### 在线工具

- [LangSmith](https://smith.langchain.com/) - AI 调试平台
- [OpenAI Playground](https://platform.openai.com/playground) - 测试 Prompt
- [Claude Workbench](https://console.anthropic.com/workbench) - Claude 测试

---

## 🎓 完成标准

完成本教程后，你将能够：

✅ 用 TypeScript 构建 ReAct Agent
✅ 在 Next.js 中集成 AI 功能
✅ 实现流式输出（类似 ChatGPT）
✅ 构建多智能体协作系统
✅ 部署到 Vercel 生产环境
✅ 开发完整的 AI 应用（前端+后端）

---

## 🚀 立即开始

**第一步**：确保环境搭建完成
**第二步**：从 [01-大模型交互入门](./01-阶段一-LangChain基础/01-大模型交互入门.md) 开始
**第三步**：每天坚持 2-3 小时，15 天精通！

---

**准备好了吗？让我们开始你的 AI Agent 之旅！** 🚀
