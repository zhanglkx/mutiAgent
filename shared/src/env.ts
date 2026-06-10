import { z } from 'zod';

/**
 * 环境变量 Schema（启动即校验、失败即报错，企业级 fail-fast）。
 *
 * - DEEPSEEK_API_KEY：必填，DeepSeek 平台密钥。
 * - DEEPSEEK_MODEL：可选，默认 deepseek-chat。
 * - DEEPSEEK_API_BASE：可选，自定义网关地址（一般无需设置）。
 */
const envSchema = z.object({
  DEEPSEEK_API_KEY: z.string().min(1, 'DEEPSEEK_API_KEY 不能为空，请在 .env 中配置'),
  DEEPSEEK_MODEL: z.string().min(1).default('deepseek-chat'),
  DEEPSEEK_API_BASE: z.string().optional(),
});

export type AppEnv = z.infer<typeof envSchema>;

/**
 * 校验并返回类型安全的环境变量。
 * @param source 环境来源，默认 process.env（测试时可注入）。
 * @throws 当必填项缺失或非法时，抛出可读的中文错误。
 */
export function loadEnv(source: NodeJS.ProcessEnv = process.env): AppEnv {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const issues = result.error.issues
      .map(issue => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(
      `❌ 环境变量校验失败：\n${issues}\n\n` +
        '👉 请在项目根目录的 .env 文件中配置（可参考 .env.example）。'
    );
  }

  return result.data;
}
