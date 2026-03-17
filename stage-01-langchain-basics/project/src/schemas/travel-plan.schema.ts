import { z } from 'zod';

/**
 * 旅游计划数据结构
 */
export const travelPlanSchema = z.object({
  destination: z.string().describe('目的地城市'),
  duration: z.number().describe('旅行天数'),
  budget: z.object({
    total: z.number().describe('总预算（元）'),
    daily: z.number().describe('每日预算（元）'),
  }),
  itinerary: z
    .array(
      z.object({
        day: z.number().describe('第几天'),
        activities: z.array(z.string()).describe('活动列表'),
        meals: z.array(z.string()).describe('餐饮安排'),
      })
    )
    .describe('每日行程安排'),
  tips: z.array(z.string()).describe('旅行建议和注意事项'),
});

export type TravelPlan = z.infer<typeof travelPlanSchema>;
