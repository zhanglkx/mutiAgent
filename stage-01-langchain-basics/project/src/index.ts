import { TouristAssistant } from './assistant'
import 'dotenv/config'

/**
 * 智能旅游助手主程序
 * 测试所有功能场景
 */

async function main() {
  const assistant = new TouristAssistant()

  console.log('🌏 智能旅游助手已启动\n')
  console.log('='.repeat(70))

  // 测试 1：查询天气
  console.log('\n📍 场景 1：查询北京天气')
  console.log('-'.repeat(70))
  const weather = await assistant.chat('北京现在天气怎么样？')
  console.log('💬 回复:', weather)

  // 测试 2：景点推荐
  console.log('\n' + '='.repeat(70))
  console.log('📍 场景 2：推荐上海的历史景点')
  console.log('-'.repeat(70))
  const attractions = await assistant.chat('推荐上海的历史景点')
  console.log('💬 回复:', attractions)

  // 测试 3：预算计算
  console.log('\n' + '='.repeat(70))
  console.log('📍 场景 3：计算成都3天舒适游预算')
  console.log('-'.repeat(70))
  const budget = await assistant.chat('帮我算一下成都3天舒适游的预算')
  console.log('💬 回复:', budget)

  // 测试 4：综合咨询
  console.log('\n' + '='.repeat(70))
  console.log('📍 场景 4：综合咨询（天气+景点+预算）')
  console.log('-'.repeat(70))
  const comprehensive = await assistant.chat(
    '我想去西安玩3天，帮我查一下天气，推荐一些历史景点，顺便算一下经济游的预算'
  )
  console.log('💬 回复:', comprehensive)

  // 测试 5：生成结构化旅游计划
  console.log('\n' + '='.repeat(70))
  console.log('📍 场景 5：生成北京3日游旅游计划')
  console.log('-'.repeat(70))
  console.log('⏳ 正在生成计划...\n')

  const plan = await assistant.generatePlan(`
    帮我制定一个北京3日游计划：
    - 预算：每天600元
    - 喜欢历史文化景点
    - 想尝试北京特色美食
  `)

  console.log('📋 旅游计划：')
  console.log(JSON.stringify(plan, null, 2))

  console.log('\n' + '='.repeat(70))
  console.log('\n✅ 所有功能测试完成！')
  console.log('\n💡 提示：')
  console.log('   - 支持天气查询、景点推荐、预算计算')
  console.log('   - 支持生成结构化旅游计划')
  console.log('   - AI 能自动判断何时调用工具')
  console.log('   - 工具可以组合使用完成复杂任务')
}

main().catch((error) => {
  console.error('\n❌ 错误:', error.message)
  console.error('\n💡 请检查：')
  console.error('   1. .env 文件中的 API Key 是否正确')
  console.error('   2. 网络连接是否正常')
  console.error('   3. API Key 是否有足够的额度')
})
