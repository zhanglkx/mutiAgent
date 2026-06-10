import { describe, it, expect } from 'vitest';
import { personSchema, contactSchema, sentimentSchema, resumeSchema } from './schemas';

describe('结构化输出 Schemas', () => {
  it('personSchema 校验合法对象，拒绝缺字段', () => {
    const person = personSchema.parse({ name: '小明', age: 25, occupation: '前端工程师' });
    expect(person.name).toBe('小明');
    expect(() => personSchema.parse({ name: '小明' })).toThrow();
  });

  it('contactSchema 允许 phone/company 缺省', () => {
    const contact = contactSchema.parse({ name: '张三', email: 'zhangsan@example.com' });
    expect(contact.phone).toBeUndefined();
    expect(contact.company).toBeUndefined();
  });

  it('sentimentSchema 限制枚举与置信度范围', () => {
    const ok = sentimentSchema.parse({ category: 'positive', confidence: 0.9, keywords: ['推荐'] });
    expect(ok.category).toBe('positive');
    // 非法枚举
    expect(() =>
      sentimentSchema.parse({ category: 'happy', confidence: 0.5, keywords: [] })
    ).toThrow();
    // 置信度越界
    expect(() =>
      sentimentSchema.parse({ category: 'positive', confidence: 2, keywords: [] })
    ).toThrow();
  });

  it('resumeSchema 校验嵌套结构', () => {
    const resume = resumeSchema.parse({
      personal: { name: '张三', email: 'zhangsan@example.com' },
      education: [{ school: '清华', degree: '本科', major: 'CS', startYear: 2016, endYear: 2020 }],
      experience: [{ company: '字节', position: '工程师', startDate: '2022', description: '前端' }],
      skills: ['TypeScript'],
      languages: [{ name: '中文', level: 'native' }],
    });
    expect(resume.education).toHaveLength(1);
    expect(resume.languages[0]?.level).toBe('native');
  });
});
