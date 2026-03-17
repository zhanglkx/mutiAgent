import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import "dotenv/config";

/**
 * 信息提取
 * 从文本中提取结构化信息
 * 使用 DeepSeek 模型替代 OpenAI 模型
 */

async function extractContactInfo() {
  console.log("📇 联系人信息提取\n");
  console.log("=".repeat(60));

  // 定义 Schema
  const contactSchema = z.object({
    name: z.string().describe("联系人姓名"),
    email: z.string().email().describe("邮箱地址"),
    phone: z.string().optional().describe("电话号码"),
    company: z.string().optional().describe("公司名称"),
  });

  // 创建支持结构化输出的 LLM
  const llm = new ChatOpenAI({
    modelName: "deepseek-chat",
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
  }).withStructuredOutput(contactSchema);

  // 测试文本
  const text = `
你好，我是张三，在字节跳动工作。
我的邮箱是 zhangsan@example.com，
手机号是 13800138000。
`;

  console.log("\n📄 原始文本：");
  console.log(text);
  console.log("\n⏳ 正在提取...\n");

  const result = await llm.invoke(`从以下文本提取联系人信息：\n\n${text}`);

  console.log("✅ 提取结果：");
  console.log(JSON.stringify(result, null, 2));

  // 类型安全的访问
  console.log("\n💼 业务逻辑处理：");
  console.log(`发送邮件到: ${result.email}`);
  if (result.phone) {
    console.log(`拨打电话: ${result.phone}`);
  }
  if (result.company) {
    console.log(`公司: ${result.company}`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ 结构化输出让信息提取变得简单");
}

extractContactInfo().catch(console.error);
