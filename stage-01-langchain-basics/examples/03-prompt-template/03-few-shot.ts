import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import 'dotenv/config'

/**
 * Few-Shot Learning 示例
 * 通过提供示例，让 AI 模仿特定格式
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

async function fewShotDemo() {
  // 使用 DeepSeek 模型替代 gpt-4o-mini
  const llm = new ChatOpenAI({
    modelName: 'deepseek-chat',
    temperature: 0.3,
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
  })

  console.log('🎯 Few-Shot Learning 演示\n')
  console.log('='.repeat(60))

  // 创建 Few-Shot 模板
  const fewShotTemplate = ChatPromptTemplate.fromMessages([
    ['system', '你是一个代码生成助手。参考示例格式输出 React 组件。'],

    // 示例 1
    ['human', '生成一个按钮组件'],
    [
      'ai',
      `\`\`\`typescript
interface ButtonProps {
  text: string
  onClick: () => void
}

function Button({ text, onClick }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>
}
\`\`\``,
    ],

    // 示例 2
    ['human', '生成一个输入框组件'],
    [
      'ai',
      `\`\`\`typescript
interface InputProps {
  value: string
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ value, onChange }: InputProps) {
  return <input value={value} onChange={onChange} />
}
\`\`\``,
    ],

    // 用户的真实问题
    ['human', '{user_request}'],
  ])

  console.log('\n📚 已提供 2 个示例给 AI 学习\n')
  console.log('❓ 用户请求：生成一个计数器组件\n')
  console.log('🤖 AI 生成：')
  console.log('-'.repeat(60))

  const messages = await fewShotTemplate.formatMessages({
    user_request: '生成一个计数器组件',
  })

  const response = await llm.invoke(messages)
  console.log(response.content)

  console.log('\n' + '='.repeat(60))
  console.log('✅ AI 成功模仿了示例的格式和风格')
}

fewShotDemo().catch(console.error)
