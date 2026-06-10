import 'dotenv/config';
import { createChatModel } from '@ai-agent/shared';
import { contactSchema } from './schemas';

/**
 * 信息提取：从文本中提取结构化联系人信息（使用 DeepSeek 模型）。
 */
async function extractContactInfo() {
  console.log('📇 联系人信息提取\n');
  console.log('='.repeat(60));

  // 先声明文本，再使用（修复原先「先用后声明」导致的 ReferenceError）
  const text = `
你好，我是张三，在字节跳动工作。
我的邮箱是 zhangsan@example.com，
手机号是 13800138000。
`;

  const llm = createChatModel({ temperature: 0 }).withStructuredOutput(contactSchema);

  console.log('\n📄 原始文本：');
  console.log(text);
  console.log('\n⏳ 正在提取...\n');

  const result = await llm.invoke(`请从以下文本中提取联系人信息：\n${text}`);

  console.log('✅ 提取结果：');
  console.log(JSON.stringify(result, null, 2));

  console.log('\n💼 业务逻辑处理：');
  console.log(`发送邮件到: ${result.email}`);
  if (result.phone) {
    console.log(`拨打电话: ${result.phone}`);
  }
  if (result.company) {
    console.log(`公司: ${result.company}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ 结构化输出让信息提取变得简单');
}

extractContactInfo().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
