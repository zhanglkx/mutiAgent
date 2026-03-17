import { tool } from '@langchain/core/tools';
import { z } from 'zod';

/**
 * 预算计算工具
 */
export const budgetTool = tool(
  async ({ city, days, level }) => {
    const dailyBudget: Record<string, Record<string, number>> = {
      北京: { 经济: 300, 舒适: 600, 豪华: 1200 },
      上海: { 经济: 400, 舒适: 800, 豪华: 1500 },
      成都: { 经济: 200, 舒适: 400, 豪华: 800 },
      西安: { 经济: 250, 舒适: 500, 豪华: 1000 },
      杭州: { 经济: 350, 舒适: 700, 豪华: 1300 },
      深圳: { 经济: 400, 舒适: 800, 豪华: 1500 },
    };

    const daily = dailyBudget[city]?.[level] || 500;
    const total = daily * days;

    return JSON.stringify({
      city,
      days,
      level,
      dailyBudget: daily,
      totalBudget: total,
      breakdown: {
        accommodation: Math.round(daily * 0.4),
        food: Math.round(daily * 0.3),
        transportation: Math.round(daily * 0.2),
        attractions: Math.round(daily * 0.1),
      },
    });
  },
  {
    name: 'calculate_budget',
    description: '计算旅行预算，包括住宿、餐饮、交通和门票的详细分解',
    schema: z.object({
      city: z.string().describe('城市名称'),
      days: z.number().describe('旅行天数'),
      level: z.enum(['经济', '舒适', '豪华']).describe('消费水平'),
    }),
  }
);
