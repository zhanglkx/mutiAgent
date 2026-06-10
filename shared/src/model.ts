import { ChatDeepSeek } from '@langchain/deepseek';
import { loadEnv } from './env';

/**
 * 创建聊天模型的可选参数。
 */
export interface CreateChatModelOptions {
  /** 模型名，默认取环境变量 DEEPSEEK_MODEL（deepseek-chat）。 */
  model?: string;
  /** 采样温度，默认 0.7。 */
  temperature?: number;
  /** 最大输出 token 数（可选）。 */
  maxTokens?: number;
}

/**
 * 统一的 DeepSeek 聊天模型工厂。
 *
 * 全项目唯一的模型创建入口：内部完成环境变量校验与默认值填充，
 * 调用方无需再关心 apiKey / baseURL 等细节。
 *
 * @example
 * const llm = createChatModel({ temperature: 0 });
 * const res = await llm.invoke('你好');
 */
export function createChatModel(options: CreateChatModelOptions = {}): ChatDeepSeek {
  const env = loadEnv();
  const { model = env.DEEPSEEK_MODEL, temperature = 0.7, maxTokens } = options;

  return new ChatDeepSeek({
    model,
    temperature,
    apiKey: env.DEEPSEEK_API_KEY,
    ...(maxTokens !== undefined ? { maxTokens } : {}),
    ...(env.DEEPSEEK_API_BASE !== undefined
      ? { configuration: { baseURL: env.DEEPSEEK_API_BASE } }
      : {}),
  });
}

/**
 * 创建 DeepSeek 推理模型（deepseek-reasoner）。
 * 注意：reasoner 不支持工具调用与结构化输出，仅用于纯推理对话。
 */
export function createReasoner(options: Omit<CreateChatModelOptions, 'model'> = {}): ChatDeepSeek {
  return createChatModel({ ...options, model: 'deepseek-reasoner' });
}
