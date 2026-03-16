import { ChatOpenAI } from '@langchain/openai'

/**
 * DeepSeek 配置工具
 * 
 * DeepSeek 是中国的大模型，兼容 OpenAI API
 * 优势：
 * - 价格便宜：约为 OpenAI 的 1/10
 * - 中文理解好
 * - 响应速度快
 * - 国内访问稳定
 */

export interface DeepSeekConfig {
  temperature?: number
  maxTokens?: number
  modelName?: 'deepseek-chat' | 'deepseek-coder'
}

/**
 * 创建 DeepSeek 聊天模型
 */
export function createDeepSeekChat(config?: DeepSeekConfig) {
  const {
    temperature = 0.7,
    maxTokens = 2000,
    modelName = 'deepseek-chat',
  } = config || {}

  return new ChatOpenAI({
    modelName,
    temperature,
    maxTokens,
    configuration: {
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    },
  })
}

/**
 * 创建 DeepSeek 代码模型（专门用于代码生成）
 */
export function createDeepSeekCoder(config?: DeepSeekConfig) {
  return createDeepSeekChat({
    ...config,
    modelName: 'deepseek-coder',
  })
}
