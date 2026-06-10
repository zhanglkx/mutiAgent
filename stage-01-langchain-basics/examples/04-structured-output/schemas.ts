import { z } from 'zod';

/** 人物信息。 */
export const personSchema = z.object({
  name: z.string().describe('人名'),
  age: z.number().describe('年龄'),
  occupation: z.string().describe('职业'),
});
export type Person = z.infer<typeof personSchema>;

/** 联系人信息（电话/公司可选）。 */
export const contactSchema = z.object({
  name: z.string().describe('联系人姓名'),
  email: z.string().describe('邮箱地址'),
  phone: z.string().optional().describe('电话号码'),
  company: z.string().optional().describe('公司名称'),
});
export type Contact = z.infer<typeof contactSchema>;

/** 情感分析结果。 */
export const sentimentSchema = z.object({
  category: z.enum(['positive', 'negative', 'neutral']).describe('情感分类'),
  confidence: z.number().min(0).max(1).describe('置信度（0-1）'),
  keywords: z.array(z.string()).describe('关键词列表'),
});
export type Sentiment = z.infer<typeof sentimentSchema>;

/** 简历结构。 */
export const resumeSchema = z.object({
  personal: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    location: z.string().optional(),
  }),
  education: z.array(
    z.object({
      school: z.string(),
      degree: z.string(),
      major: z.string(),
      startYear: z.number(),
      endYear: z.number(),
    })
  ),
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z.string(),
    })
  ),
  skills: z.array(z.string()),
  languages: z.array(
    z.object({
      name: z.string(),
      level: z.enum(['native', 'fluent', 'intermediate', 'basic']),
    })
  ),
});
export type Resume = z.infer<typeof resumeSchema>;
