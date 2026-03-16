#!/bin/bash

echo "🧪 测试 DeepSeek 配置..."
echo ""

# 检查 .env 文件
if [ ! -f ".env" ]; then
    echo "❌ .env 文件不存在"
    echo "💡 请复制 .env.example 并配置 DEEPSEEK_API_KEY"
    exit 1
fi

# 检查 API Key
if grep -q "DEEPSEEK_API_KEY=sk-" .env; then
    echo "✅ DeepSeek API Key 已配置"
else
    echo "❌ DeepSeek API Key 未配置"
    echo "💡 请在 .env 文件中设置 DEEPSEEK_API_KEY"
    exit 1
fi

echo ""
echo "🚀 运行测试示例..."
echo ""

# 运行第一个示例
npx tsx stage-01-langchain-basics/examples/01-basic-interaction/01-hello-ai.ts

echo ""
echo "✅ 测试完成！"
