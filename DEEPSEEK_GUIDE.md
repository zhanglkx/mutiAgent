# 🤖 DeepSeek 模型使用指南

## 什么是 DeepSeek？

DeepSeek 是中国的大语言模型，性能强大且价格实惠。

### 优势

- 💰 **价格便宜**：约为 OpenAI 的 1/10
- 🇨🇳 **中文理解好**：专门针对中文优化
- ⚡ **响应快**：国内访问速度快
- 🔒 **数据安全**：数据不出境

### 模型列表

| 模型名称 | 用途 | 价格 |
|---------|------|------|
| deepseek-chat | 通用对话 | ￥1/百万tokens |
| deepseek-coder | 代码生成 | ￥1/百万tokens |

## 配置方法

### 1. 获取 API Key

访问：https://platform.deepseek.com/

### 2. 配置环境变量

在 `.env` 文件中添加：

\`\`\`bash
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxx
DEEPSEEK_BASE_URL=https://api.deepseek.com
\`\`\`

### 3. 使用方式

#### 方式一：直接使用（推荐）

\`\`\`typescript
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

const response = await llm.invoke('你好，介绍一下 React')
console.log(response.content)
\`\`\`

#### 方式二：使用配置工具

\`\`\`typescript
import { createDeepSeekChat } from './deepseek-config'
import 'dotenv/config'

// 创建聊天模型
const llm = createDeepSeekChat({
  temperature: 0.7,
  maxTokens: 2000,
})

// 创建代码模型（用于代码生成）
const coder = createDeepSeekCoder({
  temperature: 0.3, // 代码生成建议低温度
})
\`\`\`

## 已适配的示例

所有示例都已支持 DeepSeek，只需：

1. 配置好 `.env` 文件
2. 直接运行示例即可

\`\`\`bash
# 运行第一个示例
npx tsx stage-01-langchain-basics/examples/01-basic-interaction/01-hello-ai.ts
\`\`\`

## 性能对比

| 指标 | DeepSeek | GPT-4o-mini | Claude 3.5 |
|------|----------|-------------|-----------|
| 价格 | ￥1/百万tokens | $0.15/百万tokens | $3/百万tokens |
| 中文理解 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 代码生成 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 响应速度 | ⚡⚡⚡ | ⚡⚡ | ⚡⚡ |

## 注意事项

1. **API 兼容性**：DeepSeek 完全兼容 OpenAI API，无需修改代码逻辑
2. **模型选择**：
   - 一般对话：使用 `deepseek-chat`
   - 代码生成：使用 `deepseek-coder`
3. **温度设置**：
   - 对话：0.7-0.9
   - 代码：0.1-0.3

## 常见问题

### Q: 如何切换回 OpenAI？

A: 修改代码中的初始化部分：

\`\`\`typescript
// 改回 OpenAI
const llm = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0.7,
})
\`\`\`

### Q: DeepSeek 支持哪些功能？

A: 支持所有教程中的功能：
- ✅ 基础对话
- ✅ 流式输出
- ✅ Function Calling（工具调用）
- ✅ 结构化输出
- ✅ 多轮对话

### Q: 遇到错误怎么办？

A: 检查：
1. API Key 是否正确
2. baseURL 是否配置
3. 网络连接是否正常

## 相关链接

- [DeepSeek 官网](https://www.deepseek.com/)
- [DeepSeek 平台](https://platform.deepseek.com/)
- [API 文档](https://platform.deepseek.com/api-docs/)

---

**现在你可以使用 DeepSeek 开始学习了！** 🚀
