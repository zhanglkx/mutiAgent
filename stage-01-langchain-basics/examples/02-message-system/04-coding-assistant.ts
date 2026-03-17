import { ChatOpenAI } from '@langchain/openai'
import { SystemMessage, HumanMessage } from '@langchain/core/messages'
import 'dotenv/config'

/**
 * 智能编程助手
 * 功能：代码审查、解释、调试
 * 演示消息系统的综合应用
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

type Mode = 'review' | 'explain' | 'debug'

class CodingAssistant {
  private llm: ChatOpenAI
  private modes: Record<Mode, string>

  constructor() {
    // 使用 DeepSeek 模型替代 gpt-4o-mini
    this.llm = new ChatOpenAI({
      modelName: 'deepseek-chat',
      temperature: 0.3,
      configuration: {
        baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
      },
    })

    this.modes = {
      review: `你是代码审查专家。
审查重点：
1. 代码规范（命名、格式）
2. 潜在 bug
3. 性能问题
4. 安全漏洞

输出格式：
✅ 优点：
⚠️ 问题：
💡 建议：`,

      explain: `你是代码讲解专家。
讲解步骤：
1. 概述功能（1 句话）
2. 逐行解释
3. 类比说明
4. 最佳实践

使用 emoji 和清晰的排版。`,

      debug: `你是调试专家。
分析流程：
1. 🔍 定位错误
2. 🧠 分析原因
3. 🛠️ 修复代码
4. 📚 预防建议

给出可直接运行的修复代码。`,
    }
  }

  async process(mode: Mode, code: string): Promise<string> {
    const messages = [
      new SystemMessage(this.modes[mode]),
      new HumanMessage(`代码：\n\`\`\`typescript\n${code}\n\`\`\``),
    ]

    const response = await this.llm.invoke(messages)
    return response.content as string
  }
}

// 使用示例
async function main() {
  const assistant = new CodingAssistant()

  // 示例代码（有 bug）
  const buggyCode = `
async function fetchData() {
  let data = null
  fetch('/api/users')
    .then(res => res.json())
    .then(json => data = json)

  return data  // bug: 返回 null
}`

  console.log('👨‍💻 智能编程助手\n')
  console.log('='.repeat(60))
  console.log('🐛 调试模式')
  console.log('='.repeat(60))
  console.log(await assistant.process('debug', buggyCode))

  console.log('\n' + '='.repeat(60))
  console.log('📖 解释模式')
  console.log('='.repeat(60))

  const goodCode = `
const [count, setCount] = useState(0)

useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count])`

  console.log(await assistant.process('explain', goodCode))
}

main().catch(console.error)
