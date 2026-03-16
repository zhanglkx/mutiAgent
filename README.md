# AI Agent 开发教程 - Monorepo 项目

> 从前端到 AI Agent：用 TypeScript 精通 LangChain.js 和 LangGraph.js

## 📚 项目简介

本项目是一个完整的 AI Agent 开发教程，使用 **pnpm monorepo** 架构，专为前端开发者设计。通过 TypeScript 和你熟悉的工具链，学习 LangChain.js 和 LangGraph.js。

## 🎯 教程结构

### ✅ 第一阶段：LangChain 基础（已完成）

掌握大模型交互和工具调用的基础知识。

- [01-大模型交互入门](./stage-01-langchain-basics/examples/01-basic-interaction/) - invoke、async/await、temperature
- [02-消息系统详解](./stage-01-langchain-basics/examples/02-message-system/) - 4种消息类型、对话历史管理
- [03-提示词模板](./stage-01-langchain-basics/examples/03-prompt-template/) - ChatPromptTemplate、变量插值
- [04-结构化输出](./stage-01-langchain-basics/examples/04-structured-output/) - Zod Schema、类型安全
- [05-工具系统核心](./stage-01-langchain-basics/examples/05-tool-system/) - Function Calling、工具定义
- [实战项目：智能旅游助手](./stage-01-langchain-basics/project/) - 综合应用

**详细文档**: [第一阶段 README](./stage-01-langchain-basics/README.md)

### 🔵 后续阶段（规划中）

- **第二阶段**: LangGraph 核心 - 状态机、节点与边、ReAct Agent
- **第三阶段**: LangGraph 进阶 - 持久化、人机协同
- **第四阶段**: 多智能体系统 - 协作模式、角色分工
- **第五阶段**: 工程化部署 - 流式输出、Next.js 集成

## 🚀 快速开始

### 1. 环境准备

确保你的环境满足以下要求：

\`\`\`bash
node -v    # >= v20.0.0
pnpm -v    # >= 8.0.0
\`\`\`

如果还没有安装 pnpm：

\`\`\`bash
npm install -g pnpm
\`\`\`

### 2. 克隆项目并安装依赖

\`\`\`bash
# 克隆项目
git clone <your-repo-url>
cd mutiAgent

# 安装所有依赖
pnpm install
\`\`\`

### 3. 配置环境变量

\`\`\`bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，填入你的 API Keys
\`\`\`

\`.env\` 文件内容示例：

\`\`\`bash
# OpenAI API Key (推荐用于学习)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxx

# Anthropic API Key (推荐用于生产，可选)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxx

# LangSmith 调试工具 (可选)
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_xxxxxxxxxxxxx
LANGCHAIN_PROJECT=langchain-basics-tutorial
\`\`\`

### 4. 运行示例代码

\`\`\`bash
# 运行第一阶段的示例
npx tsx stage-01-langchain-basics/examples/01-basic-interaction/01-hello-ai.ts

# 运行实战项目
cd stage-01-langchain-basics/project
pnpm start
\`\`\`

## 📂 项目结构

\`\`\`
mutiAgent/
├── .env.example                     # 环境变量模板
├── .gitignore                       # Git 忽略文件
├── package.json                     # 根 package.json
├── pnpm-workspace.yaml              # pnpm workspace 配置
├── 教程/                            # 教程文档
│   ├── 01-阶段一-LangChain基础/
│   ├── 02-阶段二-LangGraph核心/
│   └── ...
└── stage-01-langchain-basics/      # 第一阶段实现
    ├── README.md                    # 第一阶段详细文档
    ├── examples/                    # 示例代码
    │   ├── 01-basic-interaction/   # 各章节示例
    │   ├── 02-message-system/
    │   ├── 03-prompt-template/
    │   ├── 04-structured-output/
    │   └── 05-tool-system/
    └── project/                     # 实战项目
        ├── src/
        ├── package.json
        └── tsconfig.json
\`\`\`

## 🛠️ 技术栈

- **运行时**: Node.js 20+
- **包管理**: pnpm (workspace)
- **语言**: TypeScript
- **AI 框架**: LangChain.js, LangGraph.js
- **模型提供商**: OpenAI, Anthropic
- **数据验证**: Zod
- **开发工具**: tsx

## 💡 为什么使用 Monorepo？

1. **统一依赖管理** - 所有子项目共享依赖，减少磁盘占用
2. **代码复用** - 示例代码和实战项目可以共享工具函数
3. **版本一致性** - 确保所有包使用相同版本的依赖
4. **开发效率** - 可以同时开发和测试多个包

## 📖 学习路径

### 推荐学习顺序

1. **第1-2天**: 完成第一阶段第01-02章
2. **第3-4天**: 完成第一阶段第03-04章
3. **第5-6天**: 完成第一阶段第05章
4. **第7天**: 完成智能旅游助手实战项目

### 学习建议

- 每个示例都要亲自运行和修改
- 尝试扩展示例，添加新功能
- 遇到问题先查看 README 和注释
- 使用 LangSmith 调试工具追踪执行过程

## 🔧 常用命令

\`\`\`bash
# 安装所有依赖
pnpm install

# 运行特定包的脚本
pnpm --filter @ai-agent/tourist-assistant start

# 清理所有 node_modules
pnpm -r clean

# 构建所有包
pnpm -r build

# 查看依赖树
pnpm list --depth=1
\`\`\`

## 📚 相关资源

### 官方文档

- [LangChain.js 文档](https://js.langchain.com/)
- [LangGraph.js 文档](https://langchain-ai.github.io/langgraphjs/)
- [OpenAI API 文档](https://platform.openai.com/docs)
- [Anthropic Claude 文档](https://docs.anthropic.com/)
- [pnpm 文档](https://pnpm.io/)

### 社区资源

- [LangChain Discord](https://discord.gg/langchain)
- [GitHub Discussions](https://github.com/langchain-ai/langchainjs/discussions)

## 🤝 贡献指南

欢迎贡献代码、提出问题或改进文档！

1. Fork 本项目
2. 创建特性分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交更改 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 开启 Pull Request

## ❓ 常见问题

### Q: pnpm 安装失败怎么办？

A: 尝试清理缓存后重新安装：

\`\`\`bash
pnpm store prune
pnpm install
\`\`\`

### Q: 如何只运行某个阶段的代码？

A: 使用 \`--filter\` 参数：

\`\`\`bash
pnpm --filter "@ai-agent/*" install
\`\`\`

### Q: API Key 在哪里获取？

A:
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/

### Q: 如何贡献新的示例？

A: 在对应阶段的 \`examples\` 目录下添加新文件，并更新 README。

## 📝 许可证

MIT License

---

**开始你的 AI Agent 开发之旅！** 🚀

如有问题，请查看各阶段的详细 README 或提交 Issue。
