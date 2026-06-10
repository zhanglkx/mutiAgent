import 'dotenv/config';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { tool, type StructuredToolInterface } from '@langchain/core/tools';
import { z } from 'zod';
import { HumanMessage, type BaseMessage, type ToolMessage } from '@langchain/core/messages';
import { createChatModel } from '@ai-agent/shared';

/**
 * 文件管理助手：读取、写入、列出文件（使用 DeepSeek 模型）。
 */
const listFilesTool = tool(
  async ({ directory }) => {
    try {
      const files = await readdir(directory);
      const extra = files.length > 20 ? `\n... 还有 ${files.length - 20} 个文件` : '';
      return `文件列表：\n${files.slice(0, 20).join('\n')}${extra}`;
    } catch (error) {
      return `无法访问目录：${error instanceof Error ? error.message : String(error)}`;
    }
  },
  {
    name: 'list_files',
    description: '列出指定目录下的所有文件',
    schema: z.object({ directory: z.string().describe('目录路径') }),
  }
);

const readFileTool = tool(
  async ({ filePath }) => {
    try {
      const content = await readFile(filePath, 'utf-8');
      const truncated = content.length > 500 ? '\n...(内容已截断)' : '';
      return `文件内容（前500字符）：\n${content.substring(0, 500)}${truncated}`;
    } catch (error) {
      return `无法读取文件：${error instanceof Error ? error.message : String(error)}`;
    }
  },
  {
    name: 'read_file',
    description: '读取文件内容',
    schema: z.object({ filePath: z.string().describe('文件路径') }),
  }
);

const writeFileTool = tool(
  async ({ filePath, content }) => {
    try {
      await writeFile(filePath, content, 'utf-8');
      return `文件已写入：${filePath}`;
    } catch (error) {
      return `无法写入文件：${error instanceof Error ? error.message : String(error)}`;
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
);

class FileAssistant {
  private readonly tools: StructuredToolInterface[] = [listFilesTool, readFileTool, writeFileTool];
  private readonly model = createChatModel({ temperature: 0 }).bindTools(this.tools);

  async chat(userInput: string): Promise<string> {
    const messages: BaseMessage[] = [new HumanMessage(userInput)];

    for (;;) {
      const response = await this.model.invoke(messages);
      messages.push(response);

      const toolCalls = response.tool_calls ?? [];
      if (toolCalls.length === 0) {
        return response.content as string;
      }

      for (const toolCall of toolCalls) {
        console.log(`  🔧 调用工具: ${toolCall.name}`);
        const selected = this.tools.find(t => t.name === toolCall.name);
        if (selected) {
          const toolMessage = (await selected.invoke(toolCall)) as ToolMessage;
          messages.push(toolMessage);
        }
      }
    }
  }
}

async function main() {
  const assistant = new FileAssistant();

  console.log('📁 文件管理助手\n');
  console.log('='.repeat(60));

  console.log('\n测试 1：列出当前目录文件');
  console.log('-'.repeat(60));
  console.log('👤 用户: 列出当前目录下的所有文件\n');
  const answer1 = await assistant.chat('列出当前目录下的所有文件');
  console.log(`💬 最终回答: ${answer1.substring(0, 200)}...`);

  console.log('\n' + '='.repeat(60));
  console.log('测试 2：创建文件');
  console.log('-'.repeat(60));
  console.log('👤 用户: 创建一个 test.txt 文件，内容是 Hello World\n');
  console.log(`💬 最终回答: ${await assistant.chat('创建一个 test.txt 文件，内容是 Hello World')}`);

  console.log('\n' + '='.repeat(60));
  console.log('测试 3：读取文件');
  console.log('-'.repeat(60));
  console.log('👤 用户: 读取 test.txt 文件的内容\n');
  console.log(`💬 最终回答: ${await assistant.chat('读取 test.txt 文件的内容')}`);

  console.log('\n' + '='.repeat(60));
  console.log('✅ AI 能够操作文件系统');
}

main().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
