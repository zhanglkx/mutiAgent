# 🎓 第一阶段：LangChain 基础

> 从前端到 AI Agent：用 TypeScript 精通 LangChain.js 基础知识

## 📚 项目简介

本项目是 LangChain.js 基础教程的完整实现，涵盖了大模型交互、消息系统、提示词模板、结构化输出和工具系统五大核心模块，并包含一个综合性的智能旅游助手实战项目。

## 🎯 学习目标

完成本阶段学习后，你将掌握：

- ✅ LangChain.js 基础 API 使用
- ✅ 消息系统和对话管理
- ✅ Prompt Template 设计技巧
- ✅ 结构化输出和数据验证
- ✅ Function Calling 工具系统
- ✅ 完整 AI 应用开发流程

## 📂 项目结构

\`\`\`
stage-01-langchain-basics/
├── examples/                        # 各章节示例代码
│   ├── 01-basic-interaction/       # 第01章：大模型交互入门
│   ├── 02-message-system/          # 第02章：消息系统详解
│   ├── 03-prompt-template/         # 第03章：提示词模板
│   ├── 04-structured-output/       # 第04章：结构化输出
│   └── 05-tool-system/             # 第05章：工具系统核心
├── project/                         # 实战项目：智能旅游助手
│   ├── src/
│   │   ├── tools/                  # 工具定义
│   │   ├── schemas/                # 数据结构
│   │   ├── assistant.ts            # 助手主类
│   │   └── index.ts                # 入口文件
│   ├── .env.example                # 环境变量示例
│   ├── package.json
│   └── tsconfig.json
└── README.md                        # 本文档
\`\`\`

## 🚀 快速开始

### 1. 环境准备

确保你的环境满足以下要求：

- Node.js >= 20.0.0
- pnpm >= 8.0.0

### 2. 安装依赖

在项目根目录下运行：

\`\`\`bash
# 安装 pnpm（如果还没有）
npm install -g pnpm

# 安装所有依赖
pnpm install
\`\`\`

### 3. 配置环境变量

复制 \`.env.example\` 文件为 \`.env\` 并填入你的 API Keys：

\`\`\`bash
# 在项目根目录
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

每个示例都可以独立运行：

\`\`\`bash
# 第01章示例
pnpm --filter @ai-agent/examples-01-basic-interaction dev
# 或直接运行单个文件
npx tsx stage-01-langchain-basics/examples/01-basic-interaction/01-hello-ai.ts

# 第02章示例
npx tsx stage-01-langchain-basics/examples/02-message-system/01-message-types.ts

# 第03章示例
npx tsx stage-01-langchain-basics/examples/03-prompt-template/01-basic-template.ts

# 第04章示例
npx tsx stage-01-langchain-basics/examples/04-structured-output/01-basic-structured.ts

# 第05章示例
npx tsx stage-01-langchain-basics/examples/05-tool-system/01-basic-tool.ts
\`\`\`

### 5. 运行实战项目

\`\`\`bash
# 进入项目目录
cd stage-01-langchain-basics/project

# 安装依赖（如果还没有）
pnpm install

# 运行项目
pnpm start
\`\`\`

## 📖 章节内容

### 第01章：大模型交互入门

学习如何初始化和调用大模型 API。

**示例文件：**

1. \`01-hello-ai.ts\` - 第一个 AI 程序
2. \`02-interactive-chat.ts\` - 交互式命令行聊天
3. \`03-temperature-demo.ts\` - Temperature 参数演示
4. \`04-streaming.ts\` - 流式输出演示

**核心知识点：**
- \`ChatOpenAI\` 初始化
- \`llm.invoke()\` 方法
- Temperature 参数控制
- 流式输出 \`llm.stream()\`

### 第02章：消息系统详解

掌握 LangChain 的四种消息类型和对话管理。

**示例文件：**

1. \`01-message-types.ts\` - 四种消息类型演示
2. \`02-customer-service.ts\` - 客服机器人
3. \`03-conversation-manager.ts\` - 对话历史管理
4. \`04-coding-assistant.ts\` - 智能编程助手

**核心知识点：**
- SystemMessage, HumanMessage, AIMessage, ToolMessage
- 对话历史管理
- 滑动窗口优化

### 第03章：提示词模板

学习使用模板构建可复用的 Prompt。

**示例文件：**

1. \`01-basic-template.ts\` - 基础模板使用
2. \`02-messages-placeholder.ts\` - MessagesPlaceholder 演示
3. \`03-few-shot.ts\` - Few-Shot Learning
4. \`04-code-generator.ts\` - 多框架代码生成器

**核心知识点：**
- \`ChatPromptTemplate\`
- \`MessagesPlaceholder\`
- Few-Shot 示例学习
- 模板变量插值

### 第04章：结构化输出

让 AI 返回标准 JSON 格式数据。

**示例文件：**

1. \`01-basic-structured.ts\` - 基础结构化输出
2. \`02-info-extraction.ts\` - 信息提取
3. \`03-sentiment-analysis.ts\` - 情感分析
4. \`04-resume-parser.ts\` - 简历解析器

**核心知识点：**
- Zod Schema 定义
- \`withStructuredOutput()\`
- 类型安全的数据提取

### 第05章：工具系统核心

掌握 Function Calling，让 AI 调用真实函数。

**示例文件：**

1. \`01-basic-tool.ts\` - 基础工具定义
2. \`02-weather-assistant.ts\` - 天气助手
3. \`03-multi-tool.ts\` - 多工具协作
4. \`04-file-assistant.ts\` - 文件管理助手

**核心知识点：**
- \`tool()\` 定义工具
- \`bindTools()\` 绑定工具
- 工具执行流程
- ToolMessage 返回结果

## 🎯 实战项目：智能旅游助手

### 项目功能

一个综合性的旅游助手，支持：

1. **天气查询** - 查询目的地城市的天气情况
2. **景点推荐** - 按类别推荐历史、现代、美食景点
3. **预算计算** - 根据天数和消费水平计算详细预算
4. **旅游计划生成** - 生成结构化的完整旅游计划

### 技术亮点

- ✅ 多工具协同工作
- ✅ 结构化输出（JSON）
- ✅ 类型安全（TypeScript + Zod）
- ✅ 完整的错误处理
- ✅ 可扩展的架构

### 运行效果

\`\`\`bash
🌏 智能旅游助手已启动

======================================================================
📍 场景 1：查询北京天气
----------------------------------------------------------------------
🔧 调用工具: get_weather
📤 结果: {"temp":25,"condition":"晴天","suggestion":"适合出游"}
💬 回复: 北京现在天气很好，温度25°C，晴天，非常适合出游！

======================================================================
📍 场景 2：推荐上海的历史景点
----------------------------------------------------------------------
🔧 调用工具: get_attractions
📤 结果: 上海的历史景点推荐：外滩、豫园、城隍庙、南京路
💬 回复: 上海的历史景点推荐：外滩、豫园、城隍庙、南京路...
\`\`\`

## 🛠️ 技术栈

- **运行时**: Node.js 20+
- **包管理**: pnpm
- **语言**: TypeScript
- **AI 框架**: LangChain.js
- **模型提供商**: OpenAI, Anthropic
- **数据验证**: Zod
- **开发工具**: tsx

## 💡 常见问题

### Q: 为什么选择 pnpm？

A: pnpm 提供更快的安装速度和更好的磁盘空间利用，特别适合 monorepo 项目。

### Q: 示例代码运行失败怎么办？

A: 请检查：
1. API Key 是否正确配置
2. Node.js 版本是否 >= 20
3. 网络连接是否正常
4. API Key 是否有足够的额度

### Q: 如何切换到 Claude 模型？

A: 将代码中的 \`ChatOpenAI\` 替换为 \`ChatAnthropic\`：

\`\`\`typescript
import { ChatAnthropic } from '@langchain/anthropic'

const llm = new ChatAnthropic({
  modelName: 'claude-3-5-sonnet-20241022',
})
\`\`\`

### Q: 如何调试 Prompt？

A: 使用 LangSmith：

1. 在 \`.env\` 中配置：
   \`\`\`bash
   LANGCHAIN_TRACING_V2=true
   LANGCHAIN_API_KEY=your_langsmith_key
   \`\`\`

2. 访问 https://smith.langchain.com 查看详细日志

## 📚 推荐学习路径

1. **第1-2天**: 学习第01-02章，理解基础概念
2. **第3-4天**: 学习第03-04章，掌握模板和结构化输出
3. **第5-6天**: 学习第05章，理解工具系统
4. **第7天**: 完成实战项目，巩固所学知识

## 🔗 相关资源

- [LangChain.js 官方文档](https://js.langchain.com/)
- [OpenAI API 文档](https://platform.openai.com/docs)
- [Anthropic Claude 文档](https://docs.anthropic.com/)
- [Zod 文档](https://zod.dev/)

## 🚀 下一步

完成本阶段后，继续学习：

- **第二阶段**: LangGraph 核心 - 构建有状态的 Agent
- **第三阶段**: LangGraph 进阶 - 持久化和人机协同
- **第四阶段**: 多智能体系统
- **第五阶段**: 工程化部署

## 📝 许可证

MIT License

---

**祝学习愉快！** 🎉

## 📦 依赖版本

所有依赖已更新到最新稳定版本（2026-03-16）：

- langchain: ^1.2.32
- @langchain/openai: ^1.2.13
- @langchain/anthropic: ^1.3.23
- @langchain/core: ^1.1.32
- zod: ^4.3.6
- typescript: ^5.7.3

详细信息请查看 [DEPENDENCIES.md](./stage-01-langchain-basics/DEPENDENCIES.md)

