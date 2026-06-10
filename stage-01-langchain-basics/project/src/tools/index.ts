import { weatherTool } from './weather.tool';
import { attractionsTool } from './attractions.tool';
import { budgetTool } from './budget.tool';

export { weatherTool } from './weather.tool';
export { attractionsTool } from './attractions.tool';
export { budgetTool } from './budget.tool';
export type { WeatherInfo } from './weather.tool';
export type { AttractionCategory } from './attractions.tool';
export type { BudgetLevel } from './budget.tool';

/** 旅游助手可用的全部工具集合（类型由各工具推断，无 any）。 */
export const travelTools = [weatherTool, attractionsTool, budgetTool];
