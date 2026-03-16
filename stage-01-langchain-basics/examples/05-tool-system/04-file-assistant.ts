import { ChatOpenAI } from '@langchain/openai'
import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import {
  HumanMessage,
  AIMessage,
  ToolMessage,
  BaseMessage,
} from '@langchain/core/messages'
import * as fs from 'fs/promises'
import 'dotenv/config'

/**
 * 文件管理助手
 * 功能：读取、写入、列出文件
 */

// 工具1：列出文件
const listFilesTool = tool(
  async ({ directory }) => {
    try {
      const files = await fs.readdir(directory)
      return `文件列表：\n${files.slice(0, 20).join('\n')}${
        files.length > 20 ? `\n... 还有 ${files.length - 20} 个文件` : ''
      }`
    } catch (error: any) {
      return `无法访问目录：${error.message}`
    }
  },
  {
    name: 'list_files',
    description: '列出指定目录下的所有文件',
    schema: z.object({
      directory: z.string().describe('目录路径'),
    }),
  }
)

// 工具2：读取文件
const readFileTool = tool(
  async ({ filePath }) => {
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      const preview = content.substring(0, 500)
      return `文件内容（前500字符）：\n${preview}${
        content.length > 500 ? '\n...(内容已截断)' : ''
      }`
    } catch (error: any) {
      return `无法读取文件：${error.message}`
    }
  },
  {
    name: 'read_file',
    description: '读取文件内容',
    schema: z.object({
      filePath: z.string().describe('文件路径'),
    }),
  }
)

// 工具3：写入文件
const writeFileTool = tool(
  async ({ filePath, content }) => {
    try {
      await fs.writeFile(filePath, content, 'utf-8')
      return `文件已写入：${filePath}`
    } catch (error: any) {
      return `无法写入文件：${error.message}`
    }
  },
  {
    name: 'write_file',
    description: '写入内容到文件',
    schema: z.object({
      filePath: z.string().describe('文件路径'),
      content: z.string().describe('要写入的内容'),
    }),
  }
)

// 创建助手
class FileAssistant {
  private llm: ChatOpenAI
  private tools: any[]

  constructor() {
    this.tools = [listFilesTool, readFileTool, writeFileTool]
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
    }).bindTools(this.tools)
  }

  async chat(userInput: string): Promise<string> {
    const messages: BaseMessage[] = [new HumanMessage(userInput)]

    while (true) {
      const response = await this.llm.invoke(messages)
      messages.push(response)

      if (!response.tool_calls || response.tool_calls.length === 0) {
        return response.content as string
      }

      for (const toolCall of response.tool_calls) {
        console.log(`  🔧 调用工具: ${toolCall.name}`)

        const tool = this.tools.find((t) => t.name === toolCall.name)
        if (tool) {
          const result = await tool.invoke(toolCall.args)
          console.log(`  📤 结果: ${result.substring(0, 100)}...\n`)

          messages.push(
            new ToolMessage({
              content: result,
              tool_call_id: toolCall.id!,
            })
          )
        }
      }
    }
  }
}

// 测试
async function main() {
  const assistant = new FileAssistant()

  console.log('📁 文件管理助手\n')
  console.log('='.repeat(60))

  console.log('\n测试 1：列出当前目录文件')
  console.log('-'.repeat(60))
  console.log('👤 用户: 列出当前目录下的所有文件\n')
  const answer1 = await assistant.chat('列出当前目录下的所有文件')
  console.log(`💬 最终回答: ${answer1.substring(0, 200)}...`)

  console.log('\n' + '='.repeat(60))
  console.log('测试 2：创建文件')
  console.log('-'.repeat(60))
  console.log('👤 用户: 创建一个 test.txt 文件，内容是 Hello World\n')
  const answer2 = await assistant.chat('创建一个 test.txt 文件，内容是 Hello World')
  console.log(`💬 最终回答: ${answer2}`)

  console.log('\n' + '='.repeat(60))
  console.log('测试 3：读取文件')
  console.log('-'.repeat(60))
  console.log('👤 用户: 读取 test.txt 文件的内容\n')
  const answer3 = await assistant.chat('读取 test.txt 文件的内容')
  console.log(`💬 最终回答: ${answer3}`)

  console.log('\n' + '='.repeat(60))
  console.log('✅ AI 能够操作文件系统')
}

main().catch(console.error)
