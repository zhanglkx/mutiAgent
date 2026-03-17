import { tool } from '@langchain/core/tools';
import { z } from 'zod';

/**
 * 天气查询工具
 */
export const weatherTool = tool(
  async ({ city }) => {
    // 实际项目应调用真实天气 API
    const mockWeather: Record<string, any> = {
      北京: { temp: 25, condition: '晴天', suggestion: '适合出游' },
      上海: { temp: 28, condition: '多云', suggestion: '建议带伞' },
      成都: { temp: 22, condition: '阴天', suggestion: '适合户外活动' },
      西安: { temp: 27, condition: '晴天', suggestion: '适合旅游' },
      杭州: { temp: 26, condition: '多云转晴', suggestion: '天气不错' },
      深圳: { temp: 30, condition: '晴天', suggestion: '注意防晒' },
    };

    const weather = mockWeather[city] || {
      temp: 20,
      condition: '未知',
      suggestion: '暂无数据',
    };

    return JSON.stringify(weather);
  },
  {
    name: 'get_weather',
    description: '获取指定城市的天气信息，包括温度、天气状况和出行建议',
    schema: z.object({
      city: z.string().describe('城市名称，如：北京、上海'),
    }),
  }
);
