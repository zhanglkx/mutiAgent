# 🚀 快速使用指南

## 欢迎使用 LangChain 基础教程 Demo！

本指南将帮助你在5分钟内开始学习。

## 📋 前置要求

确保你的系统已安装：

- Node.js >= 20.0.0
- pnpm >= 8.0.0

## 🎯 三步开始

### Step 1: 安装 pnpm（如果还没有）

\`\`\`bash
npm install -g pnpm
\`\`\`

### Step 2: 安装项目依赖

\`\`\`bash

# 在项目根目录运行

pnpm install
\`\`\`

### Step 3: 配置 API Key

\`\`\`bash

# 复制环境变量模板

cp .env.example .env

# 用文本编辑器打开 .env 文件

# 将 OPENAI_API_KEY 的值替换为你的 API Key

\`\`\`

**获取 API Key**: https://platform.openai.com/api-keys

## 🎮 运行你的第一个示例

\`\`\`bash

# 运行第一个 AI 程序

npx tsx stage-01-langchain-basics/examples/01-basic-interaction/01-hello-ai.ts
\`\`\`

如果看到 AI 的回复，恭喜！你已经成功运行了第一个示例！

## 📚 学习路径

### 第1天：基础入门

\`\`\`bash

# 1. 第一个 AI 程序

npx tsx stage-01-langchain-basics/examples/01-basic-interaction/01-hello-ai.ts

# 2. 交互式聊天

npx tsx stage-01-langchain-basics/examples/01-basic-interaction/02-interactive-chat.ts

# 3. Temperature 参数演示

npx tsx stage-01-langchain-basics/examples/01-basic-interaction/03-temperature-demo.ts

# 4. 流式输出

npx tsx stage-01-langchain-basics/examples/01-basic-interaction/04-streaming.ts
\`\`\`

### 第2天：消息系统

\`\`\`bash

# 探索 02-message-system 目录下的4个示例

npx tsx stage-01-langchain-basics/examples/02-message-system/01-message-types.ts

# ... 运行其他示例

\`\`\`

### 第3-4天：提示词模板和结构化输出

继续探索 03-prompt-template 和 04-structured-output 目录。

### 第5-6天：工具系统

学习 05-tool-system 目录下的示例。

### 第7天：实战项目

\`\`\`bash
cd stage-01-langchain-basics/project
pnpm start
\`\`\`

## 🔧 常用命令

\`\`\`bash

# 验证项目完整性

cd stage-01-langchain-basics
./verify-project.sh

# 运行任意示例（通用格式）

npx tsx stage-01-langchain-basics/examples/<章节>/<文件名>.ts

# 运行实战项目

cd stage-01-langchain-basics/project
pnpm start
\`\`\`

## 💡 学习建议

1. **按顺序学习** - 每章都建立在前一章的基础上
2. **动手实践** - 修改示例代码，观察效果变化
3. **阅读注释** - 代码中有详细的中文注释
4. **查看文档** - 遇到问题先看 README.md

## ❓ 常见问题

### Q: API Key 无效怎么办？

A: 检查 .env 文件中的 API Key 是否正确，确保没有多余的空格或引号。

### Q: 运行示例报错？

A:

1. 确保已运行 \`pnpm install\`
2. 检查 Node.js 版本是否 >= 20
3. 确认 .env 文件中的 API Key 正确

### Q: 如何切换到 Claude 模型？

A: 修改代码中的导入和初始化：
\`\`\`typescript
import { ChatAnthropic } from '@langchain/anthropic'
const llm = new ChatAnthropic({ modelName: 'claude-3-5-sonnet-20241022' })
\`\`\`

## 📖 推荐阅读顺序

1. [项目总览 README](./README.md)
2. [第一阶段详细文档](./stage-01-langchain-basics/README.md)
3. [项目总结](./stage-01-langchain-basics/PROJECT_SUMMARY.md)
4. [交付报告](./DELIVERY_REPORT.md)

## 🎯 学习目标检查清单

完成本阶段后，你应该能够：

- [ ] 初始化和调用 LLM
- [ ] 管理多轮对话历史
- [ ] 使用提示词模板
- [ ] 实现结构化输出
- [ ] 定义和调用工具
- [ ] 构建完整的 AI 应用

## 🚀 准备好了吗？

现在就开始你的 AI Agent 开发之旅吧！

\`\`\`bash

# 运行第一个示例

npx tsx stage-01-langchain-basics/examples/01-basic-interaction/01-hello-ai.ts
\`\`\`

**祝学习愉快！** 🎉

---

**需要帮助？**

- 查看详细文档：[README.md](./README.md)
- 参考示例代码中的注释
- 访问 LangChain.js 官方文档：https://js.langchain.com/
