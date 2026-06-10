import 'dotenv/config';
import { createChatModel } from '@ai-agent/shared';
import { resumeSchema, type Resume } from './schemas';

/**
 * 简历解析器：从简历文本中提取结构化信息（使用 DeepSeek 模型）。
 */
class ResumeParser {
  private readonly llm = createChatModel({ temperature: 0 }).withStructuredOutput(resumeSchema);

  parse(resumeText: string): Promise<Resume> {
    return this.llm.invoke(`请从以下简历中提取结构化信息：\n${resumeText}`);
  }
}

const resumeText = `
张三
邮箱：zhangsan@example.com
电话：13800138000
地点：北京

教育经历：
- 清华大学，计算机科学与技术，本科，2016-2020
- 斯坦福大学，人工智能，硕士，2020-2022

工作经历：
- 字节跳动，高级前端工程师，2022.06-至今
  负责抖音前端架构设计和开发，使用 React、TypeScript、Webpack

技能：
JavaScript, TypeScript, React, Vue, Node.js, Python

语言：
- 中文（母语）
- 英语（流利）
`;

async function main() {
  console.log('📄 简历解析器\n');
  console.log('='.repeat(60));

  const parser = new ResumeParser();

  console.log('\n⏳ 正在解析简历...\n');
  const resume = await parser.parse(resumeText);

  console.log('✅ 解析结果：');
  console.log(JSON.stringify(resume, null, 2));

  // 类型安全的访问
  console.log('\n' + '='.repeat(60));
  console.log('📊 统计信息：');
  console.log(`姓名：${resume.personal.name}`);
  console.log(`教育经历：${resume.education.length} 条`);
  console.log(`工作经历：${resume.experience.length} 条`);
  console.log(`掌握技能：${resume.skills.length} 项`);
  console.log(`语言能力：${resume.languages.length} 种`);

  const latestJob = resume.experience[0];
  if (latestJob) {
    console.log('\n💼 最新工作：');
    console.log(`公司：${latestJob.company}`);
    console.log(`职位：${latestJob.position}`);
    console.log(`入职时间：${latestJob.startDate}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ 结构化输出让简历解析变得简单');
}

main().catch((error: unknown) => {
  console.error('❌ 运行失败:', error instanceof Error ? error.message : error);
});
