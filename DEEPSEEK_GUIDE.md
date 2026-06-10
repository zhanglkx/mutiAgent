# 🤖 DeepSeek 模型使用指南

## 什么是 DeepSeek？

DeepSeek 是中国的大语言模型，性能强大且价格实惠。本教程通过 LangChain.js 官方集成
[`@langchain/deepseek`](https://www.npmjs.com/package/@langchain/deepseek) 的 `ChatDeepSeek` 接入。

### 优势

- 💰 **价格便宜**：约为 OpenAI 的 1/10
- 🇨🇳 **中文理解好**：专门针对中文优化
- ⚡ **响应快**：国内访问速度快
- 🔒 **数据安全**：数据不出境

### 模型列表

| 模型名称          | 用途     | 工具调用 / 结构化输出 |
| ----------------- | -------- | --------------------- |
| deepseek-chat     | 通用对话 | ✅ 支持               |
| deepseek-reasoner | 复杂推理 | ❌ 不支持             |

> 注意：`deepseek-reasoner` 暂不支持工具调用与结构化输出，需要这些能力时请使用 `deepseek-chat`。

## 配置方法

### 1. 获取 API Key

访问：https://platform.deepseek.com/

### 2. 配置环境变量

复制根目录 `.env.example` 为 `.env`，填入你的 Key：

```bash
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxx
# 可选：DEEPSEEK_MODEL=deepseek-chat
# 可选：DEEPSEEK_API_BASE=https://api.deepseek.com
```

`ChatDeepSeek` 会自动读取 `DEEPSEEK_API_KEY`，无需在代码里再写 `apiKey` 或 `baseURL`。

### 3. 使用方式：统一的共享工厂（推荐）

全项目通过共享包 `@ai-agent/shared` 的 `createChatModel()` 创建模型。
它内部完成**环境变量校验**（缺 Key 会给出友好报错）并填充默认值：

```typescript
import { createChatModel } from '@ai-agent/shared';

// 普通对话
const llm = createChatModel({ temperature: 0.7 });
const response = await llm.invoke('你好，介绍一下 React');
console.log(response.content);

// 工具调用
const withTools = createChatModel({ temperature: 0 }).bindTools([myTool]);

// 结构化输出（类型安全，无需手写 JSON.parse）
const structured = createChatModel({ temperature: 0 }).withStructuredOutput(mySchema);
const data = await structured.invoke('...'); // data 已是 z.infer<typeof mySchema>
```

如果确实需要直接使用底层类：

```typescript
import { ChatDeepSeek } from '@langchain/deepseek';

const llm = new ChatDeepSeek({ model: 'deepseek-chat', temperature: 0.7 });
```

## 已适配的示例

所有示例都已迁移到 `ChatDeepSeek`，只需：

1. 配置好 `.env` 文件
2. 直接运行示例即可

```bash
# 运行第一个示例
pnpm dlx tsx stage-01-langchain-basics/examples/01-basic-interaction/01-hello-ai.ts
```

## DeepSeek 支持的功能

- ✅ 基础对话
- ✅ 流式输出（`llm.stream(...)`）
- ✅ Function Calling（工具调用，`bindTools`）
- ✅ 结构化输出（`withStructuredOutput`）
- ✅ 多轮对话
- ✅ 标准 token 用量字段 `response.usage_metadata.total_tokens`

## 常见问题

### Q: 报错「环境变量校验失败 / DEEPSEEK_API_KEY」？

A: 说明 `.env` 未配置或 Key 为空。复制 `.env.example` 为 `.env` 并填入有效 Key。

### Q: 结构化输出报 `json_schema is unavailable`？

A: 这是早期用 `ChatOpenAI` 直连 DeepSeek 的已知问题。本教程已改用 `ChatDeepSeek`，
它会自动选择 DeepSeek 支持的方式（function calling），不会触发该错误。

### Q: 遇到其他错误怎么办？

A: 检查 1) API Key 是否正确；2) 网络连接是否正常；3) 账户额度是否充足。

## 相关链接

- [DeepSeek 平台](https://platform.deepseek.com/)
- [ChatDeepSeek 集成文档](https://docs.langchain.com/oss/javascript/integrations/chat/deepseek)
- [LangChain.js 文档](https://js.langchain.com/)

---

**现在你可以使用 DeepSeek 开始学习了！** 🚀
