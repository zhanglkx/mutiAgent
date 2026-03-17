import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import 'dotenv/config';

/**
 * 基础结构化输出
 * 让 AI 返回标准 JSON，就像调用类型安全的 API
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

async function basicStructuredOutput() {
  console.log('📊 结构化输出演示\n');
  console.log('='.repeat(60));

  // 1. 定义数据结构（使用 Zod）
  const personSchema = z.object({
    name: z.string().describe('人名'),
    age: z.number().describe('年龄'),
    occupation: z.string().describe('职业'),
  });

  // 2. 让 LLM 支持结构化输出 - 使用 JSON 模板
  const llm = new ChatOpenAI({
    modelName: 'deepseek-chat',
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
    temperature: 0, // 降低温度提高结构化输出准确性
  });

  // 使用 JSON 模板提示模型返回结构化数据
  const prompt = `请从以下文本中提取信息，并以 JSON 格式返回：
  
文本：小明今年25岁，是一名前端工程师

请按照以下结构返回 JSON：
{
  "name": "人名",
  "age": "年龄（数字）",
  "occupation": "职业"
}

返回纯 JSON，不要有额外的文本或解释。`;

  // 3. 调用（返回类型安全的对象！）
  console.log('\n❓ 提取信息：小明今年25岁，是一名前端工程师\n');

  const result = await llm.invoke(prompt);

  console.log('✅ 结构化输出结果：');
  console.log(JSON.stringify(result, null, 2));

  // 解析 JSON 并进行类型检查
  const parsedResult = JSON.parse(result.content);

  console.log('✅ 结构化输出结果：');
  console.log(JSON.stringify(parsedResult, null, 2));

  // 验证结构
  console.log('\n💡 验证数据结构：');
  console.log(`name: ${parsedResult.name}`);
  console.log(`age: ${parsedResult.age}`);
  console.log(`occupation: ${parsedResult.occupation}`);

  console.log('\n' + '='.repeat(60));
  console.log('✅ 结构化输出让数据提取变得简单可靠');
}

basicStructuredOutput().catch(console.error);
