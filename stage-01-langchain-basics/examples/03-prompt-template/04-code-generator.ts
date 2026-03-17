import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import 'dotenv/config'

/**
 * 代码生成助手
 * 功能：根据描述生成 React/Vue/Angular 代码
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

type Framework = 'react' | 'vue' | 'angular'

class CodeGenerator {
  private llm: ChatOpenAI
  private templates: Record<Framework, ChatPromptTemplate>

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

    this.templates = {
      react: ChatPromptTemplate.fromMessages([
        [
          'system',
          `你是 React 代码生成专家。
规则：
1. 使用 TypeScript
2. 使用函数组件和 Hooks
3. 代码要有注释
4. 包含类型定义

示例格式：
\`\`\`typescript
interface ButtonProps {
  text: string
  onClick: () => void
}

function Button({ text, onClick }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>
}
\`\`\``,
        ],
        ['human', '生成组件：{description}'],
      ]),

      vue: ChatPromptTemplate.fromMessages([
        [
          'system',
          `你是 Vue 3 代码生成专家。
规则：
1. 使用 <script setup> 语法
2. 使用 TypeScript
3. 使用 Composition API
4. 代码要有注释`,
        ],
        ['human', '生成组件：{description}'],
      ]),

      angular: ChatPromptTemplate.fromMessages([
        [
          'system',
          `你是 Angular 代码生成专家。
规则：
1. 使用最新的 Angular 语法
2. 使用 TypeScript
3. 包含 @Component 装饰器
4. 代码要有注释`,
        ],
        ['human', '生成组件：{description}'],
      ]),
    }
  }

  async generate(framework: Framework, description: string): Promise<string> {
    const template = this.templates[framework]
    const messages = await template.formatMessages({ description })
    const response = await this.llm.invoke(messages)
    return response.content as string
  }
}

// 使用示例
async function main() {
  const generator = new CodeGenerator()

  console.log('🏗️ 多框架代码生成助手\n')
  console.log('='.repeat(60))

  console.log('\n🔵 React 组件：')
  console.log('-'.repeat(60))
  const reactCode = await generator.generate(
    'react',
    '一个带加载状态的按钮，点击后显示 loading'
  )
  console.log(reactCode)

  console.log('\n🟢 Vue 3 组件：')
  console.log('-'.repeat(60))
  const vueCode = await generator.generate(
    'vue',
    '一个带验证的输入框，实时显示错误提示'
  )
  console.log(vueCode)

  console.log('\n' + '='.repeat(60))
  console.log('✅ 同一个类，支持多种框架的代码生成')
}

main().catch(console.error)
