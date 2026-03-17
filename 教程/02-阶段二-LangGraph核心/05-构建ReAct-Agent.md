# 05 - 构建 ReAct Agent

> **核心理念**：推理（Reasoning）+ 行动（Acting）= 智能 Agent

## 🎯 学习目标

- 理解 ReAct 模式的原理
- 掌握如何构建标准 Agent 循环
- 学会使用 createReactAgent 预构建函数
- 构建生产级 Agent

---

## 📝 什么是 ReAct？

### ReAct 论文核心思想

**ReAct** = **Re**asoning（推理）+ **Act**ing（行动）

```
用户："北京今天天气怎么样？明天适合旅游吗？"

传统方法：
❌ 直接回答（瞎猜）："应该是晴天，适合旅游。"

ReAct 方法：
✅ 思考 → 行动 → 观察 → 思考 → 回答

1. 思考："我需要查询北京的天气"
2. 行动：调用 get_weather("北京")
3. 观察："25°C，晴天"
4. 思考："今天天气不错，明天呢？"
5. 行动：调用 get_weather_forecast("北京", "明天")
6. 观察："明天 28°C，晴天"
7. 思考："两天都是晴天，适合旅游"
8. 回答："北京今天 25°C 晴天，明天 28°C 也是晴天，非常适合旅游！"
```

---

## 🛠️ ReAct 循环结构

```
┌──────────────┐
│ 用户输入     │
└──────┬───────┘
       ↓
┌──────────────────────────┐
│ Agent 节点（AI 思考）    │
│ - 理解任务                │
│ - 决定是否需要工具        │
│ - 提取工具参数           │
└──────┬───────────────────┘
       ↓
   [有工具调用？]
     ╱    ╲
  是 ╱      ╲ 否
   ╱        ╲
  ↓          ↓
┌─────────┐  ┌──────────┐
│工具节点│  │   结束    │
│执行工具│  └──────────┘
└────┬────┘
     ↓
[回到 Agent 节点]
```

---

## 🎨 手动构建 ReAct Agent

### 完整示例

创建 `src/16-react-agent-manual.ts`：

```typescript
import { Annotation, StateGraph } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { BaseMessage, HumanMessage, AIMessage, ToolMessage } from '@langchain/core/messages';
import 'dotenv/config';

/**
 * 手动构建 ReAct Agent
 * 完整演示 Agent 循环的每一步
 */

// 1. 定义工具
const getWeatherTool = tool(
  async ({ city }) => {
    console.log(`  🌤️  查询 ${city} 天气...`);
    const weatherData: Record<string, string> = {
      北京: '25°C，晴天',
      上海: '28°C，多云',
      广州: '32°C，雷阵雨',
    };
    return weatherData[city] || '暂无数据';
  },
  {
    name: 'get_weather',
    description: '获取指定城市的当前天气',
    schema: z.object({
      city: z.string().describe('城市名称'),
    }),
  }
);

const calculateTool = tool(
  async ({ expression }) => {
    console.log(`  🧮 计算: ${expression}`);
    try {
      // 简单的表达式计算（实际项目建议使用 math.js）
      const result = eval(expression);
      return `${expression} = ${result}`;
    } catch {
      return '计算错误';
    }
  },
  {
    name: 'calculator',
    description: '执行数学计算',
    schema: z.object({
      expression: z.string().describe('数学表达式，如：2+3*4'),
    }),
  }
);

const tools = [getWeatherTool, calculateTool];

// 2. 定义 State
const AgentState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});

type State = typeof AgentState.State;

// 3. 初始化 LLM（绑定工具）
const llm = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0,
}).bindTools(tools);

// 4. Agent 节点（思考节点）
async function agentNode(state: State): Promise<Partial<State>> {
  console.log('\n🤔 Agent 思考中...');

  // 调用 LLM
  const response = await llm.invoke(state.messages);

  // 打印 AI 的想法
  if (response.tool_calls && response.tool_calls.length > 0) {
    console.log('💡 决定调用工具:');
    response.tool_calls.forEach(tc => {
      console.log(`   - ${tc.name}(${JSON.stringify(tc.args)})`);
    });
  } else {
    console.log('💡 准备回答用户');
  }

  return { messages: [response] };
}

// 5. 工具节点（行动节点）
async function toolsNode(state: State): Promise<Partial<State>> {
  console.log('\n🔧 执行工具...');

  const lastMessage = state.messages[state.messages.length - 1];
  const toolMessages: ToolMessage[] = [];

  if ('tool_calls' in lastMessage && lastMessage.tool_calls) {
    for (const toolCall of lastMessage.tool_calls) {
      // 找到对应的工具
      const tool = tools.find(t => t.name === toolCall.name);

      if (tool) {
        // 执行工具
        const result = await tool.invoke(toolCall.args);

        toolMessages.push(
          new ToolMessage({
            content: result,
            tool_call_id: toolCall.id!,
          })
        );
      }
    }
  }

  return { messages: toolMessages };
}

// 6. 路由函数（决定是否继续）
function shouldContinue(state: State): 'continue' | 'end' {
  const lastMessage = state.messages[state.messages.length - 1];

  // 检查是否有工具调用
  if ('tool_calls' in lastMessage && lastMessage.tool_calls?.length > 0) {
    return 'continue'; // 有工具调用，继续
  }

  return 'end'; // 没有工具调用，结束
}

// 7. 构建图
const graph = new StateGraph(AgentState)
  .addNode('agent', agentNode)
  .addNode('tools', toolsNode)

  // 起始边
  .addEdge('__start__', 'agent')

  // 条件边（核心！）
  .addConditionalEdges('agent', shouldContinue, {
    continue: 'tools', // 执行工具
    end: '__end__', // 结束
  })

  // 工具执行后回到 agent
  .addEdge('tools', 'agent')

  .compile();

// 8. 测试
async function testAgent() {
  const testCases = [
    '北京今天天气怎么样？',
    '计算 (5 + 3) * 2',
    '上海天气如何？如果温度超过25度，计算 25 * 1.8 + 32 是多少华氏度',
  ];

  for (const query of testCases) {
    console.log('\n' + '='.repeat(70));
    console.log('👤 用户:', query);
    console.log('='.repeat(70));

    const result = await graph.invoke({
      messages: [new HumanMessage(query)],
    });

    // 获取最后的 AI 回复
    const aiMessages = result.messages.filter(m => m._getType() === 'ai');
    const lastAIMessage = aiMessages[aiMessages.length - 1];

    console.log('\n✅ 最终回答:');
    console.log('🤖', lastAIMessage.content);
  }
}

testAgent();
```

**运行结果**：

```
======================================================================
👤 用户: 北京今天天气怎么样？
======================================================================

🤔 Agent 思考中...
💡 决定调用工具:
   - get_weather({"city":"北京"})

🔧 执行工具...
  🌤️  查询 北京 天气...

🤔 Agent 思考中...
💡 准备回答用户

✅ 最终回答:
🤖 北京今天的天气是25°C，晴天。

======================================================================
👤 用户: 上海天气如何？如果温度超过25度，计算 25 * 1.8 + 32 是多少华氏度
======================================================================

🤔 Agent 思考中...
💡 决定调用工具:
   - get_weather({"city":"上海"})

🔧 执行工具...
  🌤️  查询 上海 天气...

🤔 Agent 思考中...
💡 决定调用工具:
   - calculator({"expression":"25 * 1.8 + 32"})

🔧 执行工具...
  🧮 计算: 25 * 1.8 + 32

🤔 Agent 思考中...
💡 准备回答用户

✅ 最终回答:
🤖 上海今天的天气是28°C，多云。由于温度超过25度，计算结果为77华氏度。
```

---

## 🚀 使用预构建的 ReAct Agent

LangGraph 提供了 `createReactAgent`，一行代码创建 Agent：

创建 `src/17-react-agent-prebuilt.ts`：

```typescript
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { HumanMessage } from '@langchain/core/messages';
import 'dotenv/config';

/**
 * 使用预构建的 ReAct Agent
 * 更简洁，生产级功能
 */

// 1. 定义工具
const searchTool = tool(
  async ({ query }) => {
    console.log(`🔍 搜索: ${query}`);
    // 模拟搜索结果
    return `关于"${query}"的搜索结果：找到相关文档3篇...`;
  },
  {
    name: 'search',
    description: '搜索文档库',
    schema: z.object({
      query: z.string().describe('搜索关键词'),
    }),
  }
);

const saveNoteTool = tool(
  async ({ content }) => {
    console.log(`📝 保存笔记: ${content.substring(0, 50)}...`);
    return `笔记已保存，ID: NOTE-${Date.now()}`;
  },
  {
    name: 'save_note',
    description: '保存笔记到数据库',
    schema: z.object({
      content: z.string().describe('笔记内容'),
    }),
  }
);

// 2. 初始化 LLM
const llm = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0,
});

// 3. 创建 Agent（一行代码！）
const agent = createReactAgent({
  llm,
  tools: [searchTool, saveNoteTool],
});

// 4. 使用
async function main() {
  console.log('🤖 ReAct Agent 已启动\n');

  const result = await agent.invoke({
    messages: [new HumanMessage('搜索 LangGraph 相关资料，并保存到笔记')],
  });

  // 查看所有消息
  console.log('\n📋 完整对话历史:');
  result.messages.forEach((msg, i) => {
    console.log(`\n${i + 1}. [${msg._getType()}]:`);
    if (msg.content) {
      console.log(`   ${msg.content}`);
    }
    if ('tool_calls' in msg && msg.tool_calls) {
      msg.tool_calls.forEach((tc: any) => {
        console.log(`   🔧 调用: ${tc.name}(${JSON.stringify(tc.args)})`);
      });
    }
  });
}

main();
```

---

## 🔍 进阶：流式输出

创建 `src/18-react-agent-streaming.ts`：

```typescript
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import 'dotenv/config';

const llm = new ChatOpenAI({ modelName: 'gpt-4o-mini' });
const agent = createReactAgent({ llm, tools: [weatherTool] });

// 使用 stream 查看每一步
async function streamAgent() {
  console.log('📡 启动流式 Agent\n');

  let stepCount = 0;

  for await (const step of agent.stream({
    messages: [new HumanMessage('北京天气？')],
  })) {
    stepCount++;
    console.log(`\n--- Step ${stepCount} ---`);
    console.log(JSON.stringify(step, null, 2));
  }
}

streamAgent();
```

---

## 🎯 实战：多工具协作 Agent

创建 `src/19-advanced-agent.ts`：

```typescript
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { HumanMessage } from '@langchain/core/messages';

/**
 * 高级 Agent：文件管理 + 搜索 + 计算
 */

// 工具1：读取文件
const readFileTool = tool(
  async ({ filename }) => {
    console.log(`📖 读取文件: ${filename}`);
    // 模拟文件内容
    const files: Record<string, string> = {
      'sales.txt': '2024年1月销售额: 50000\n2024年2月销售额: 60000',
      'users.txt': '总用户数: 1000\n活跃用户: 750',
    };
    return files[filename] || '文件不存在';
  },
  {
    name: 'read_file',
    description: '读取文件内容',
    schema: z.object({
      filename: z.string().describe('文件名'),
    }),
  }
);

// 工具2：计算器
const calculatorTool = tool(
  async ({ expression }) => {
    console.log(`🧮 计算: ${expression}`);
    return String(eval(expression));
  },
  {
    name: 'calculator',
    description: '执行数学计算',
    schema: z.object({
      expression: z.string(),
    }),
  }
);

// 工具3：发送报告
const sendReportTool = tool(
  async ({ recipient, content }) => {
    console.log(`📧 发送报告给: ${recipient}`);
    console.log(`   内容: ${content.substring(0, 50)}...`);
    return '报告已发送';
  },
  {
    name: 'send_report',
    description: '发送报告邮件',
    schema: z.object({
      recipient: z.string().describe('收件人'),
      content: z.string().describe('报告内容'),
    }),
  }
);

// 创建 Agent
const agent = createReactAgent({
  llm: new ChatOpenAI({ modelName: 'gpt-4o-mini', temperature: 0 }),
  tools: [readFileTool, calculatorTool, sendReportTool],
});

// 测试复杂任务
async function complexTask() {
  console.log('🎯 执行复杂任务\n');

  const result = await agent.invoke({
    messages: [
      new HumanMessage(`
请帮我做以下事情：
1. 读取 sales.txt 文件
2. 计算1月和2月的销售总额
3. 计算增长率（百分比）
4. 把结果发送给 boss@company.com
      `),
    ],
  });

  // 显示最终结果
  const lastMessage = result.messages[result.messages.length - 1];
  console.log('\n✅ 任务完成:');
  console.log(lastMessage.content);
}

complexTask();
```

---

## 📚 知识点总结

### ✅ 你已经掌握

1. **ReAct 模式**
   - 推理 + 行动
   - 循环执行
   - 自主决策

2. **手动构建 Agent**
   - Agent 节点
   - 工具节点
   - 条件路由

3. **预构建 Agent**
   - `createReactAgent`
   - 流式输出
   - 生产级功能

4. **实战应用**
   - 多工具协作
   - 复杂任务分解
   - 自动化流程

### 🔄 前端类比汇总

| ReAct 概念 | 前端类比    | 说明     |
| ---------- | ----------- | -------- |
| Agent 节点 | Controller  | 决策中心 |
| 工具节点   | API 调用    | 执行操作 |
| 循环       | 事件循环    | 持续处理 |
| State      | Redux Store | 状态管理 |

---

## 🚀 下一步

恭喜完成第二阶段！你已经掌握了 LangGraph 的核心概念。

**接下来**：[第三阶段](../../03-阶段三-LangGraph进阶/01-持久化与记忆.md) - 学习持久化、人机协同等进阶特性

---

## 💡 常见问题 FAQ

**Q: 为什么需要两个节点（agent + tools）？**
A: 分离关注点。agent 负责思考，tools 负责执行，清晰且易于调试。

**Q: 如何限制循环次数？**
A: 在 State 中添加计数器，路由函数中检查：

```typescript
function shouldContinue(state: State): string {
  if (state.loopCount >= 10) {
    return 'end'; // 防止无限循环
  }
  // ...
}
```

**Q: 工具执行失败怎么办？**
A: 在工具中捕获错误，返回错误信息给 AI：

```typescript
const tool = tool(async ({ x }) => {
  try {
    return await dangerousOp(x);
  } catch (error) {
    return `错误: ${error.message}`;
  }
}, {...});
```

**Q: 可以同时调用多个工具吗？**
A: 可以！AI 可以在一次响应中返回多个 tool_calls，工具节点会全部执行。
