import { describe, it, expect } from 'vitest';
import { weatherTool } from './weather.tool';
import { attractionsTool } from './attractions.tool';
import { budgetTool } from './budget.tool';

describe('weatherTool', () => {
  it('已知城市返回对应天气', async () => {
    const raw = await weatherTool.invoke({ city: '北京' });
    const data = JSON.parse(raw) as { temp: number; condition: string };
    expect(data.condition).toBe('晴天');
    expect(data.temp).toBe(25);
  });

  it('未知城市返回默认未知天气', async () => {
    const raw = await weatherTool.invoke({ city: '火星' });
    const data = JSON.parse(raw) as { condition: string };
    expect(data.condition).toBe('未知');
  });
});

describe('attractionsTool', () => {
  it('已知城市与类别返回对应景点', async () => {
    const result = await attractionsTool.invoke({ city: '北京', category: '历史' });
    expect(result).toContain('故宫');
  });

  it('未知城市返回空景点列表', async () => {
    const result = await attractionsTool.invoke({ city: '火星', category: '历史' });
    expect(result).toContain('火星的历史景点推荐：');
  });
});

describe('budgetTool', () => {
  it('已知城市与水平计算正确的总预算', async () => {
    const raw = await budgetTool.invoke({ city: '成都', days: 3, level: '经济' });
    const data = JSON.parse(raw) as { dailyBudget: number; totalBudget: number };
    expect(data.dailyBudget).toBe(200);
    expect(data.totalBudget).toBe(600);
  });

  it('未知城市使用兜底每日预算 500', async () => {
    const raw = await budgetTool.invoke({ city: '火星', days: 2, level: '舒适' });
    const data = JSON.parse(raw) as { dailyBudget: number; totalBudget: number };
    expect(data.dailyBudget).toBe(500);
    expect(data.totalBudget).toBe(1000);
  });

  it('预算分解之和等于每日预算', async () => {
    const raw = await budgetTool.invoke({ city: '北京', days: 1, level: '舒适' });
    const data = JSON.parse(raw) as {
      dailyBudget: number;
      breakdown: {
        accommodation: number;
        food: number;
        transportation: number;
        attractions: number;
      };
    };
    const { accommodation, food, transportation, attractions } = data.breakdown;
    expect(accommodation + food + transportation + attractions).toBe(data.dailyBudget);
  });
});
