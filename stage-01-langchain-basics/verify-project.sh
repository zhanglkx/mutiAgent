#!/bin/bash

echo "🔍 验证项目文件完整性..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

total=0
success=0
failed=0

check_file() {
    total=$((total + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        success=$((success + 1))
    else
        echo -e "${RED}✗${NC} $1 (缺失)"
        failed=$((failed + 1))
    fi
}

echo "📁 检查配置文件..."
check_file "project/package.json"
check_file "project/tsconfig.json"
check_file "project/.env.example"
check_file "README.md"
check_file "PROJECT_SUMMARY.md"

echo ""
echo "📁 检查第01章示例..."
check_file "examples/01-basic-interaction/01-hello-ai.ts"
check_file "examples/01-basic-interaction/02-interactive-chat.ts"
check_file "examples/01-basic-interaction/03-temperature-demo.ts"
check_file "examples/01-basic-interaction/04-streaming.ts"

echo ""
echo "📁 检查第02章示例..."
check_file "examples/02-message-system/01-message-types.ts"
check_file "examples/02-message-system/02-customer-service.ts"
check_file "examples/02-message-system/03-conversation-manager.ts"
check_file "examples/02-message-system/04-coding-assistant.ts"

echo ""
echo "📁 检查第03章示例..."
check_file "examples/03-prompt-template/01-basic-template.ts"
check_file "examples/03-prompt-template/02-messages-placeholder.ts"
check_file "examples/03-prompt-template/03-few-shot.ts"
check_file "examples/03-prompt-template/04-code-generator.ts"

echo ""
echo "📁 检查第04章示例..."
check_file "examples/04-structured-output/01-basic-structured.ts"
check_file "examples/04-structured-output/02-info-extraction.ts"
check_file "examples/04-structured-output/03-sentiment-analysis.ts"
check_file "examples/04-structured-output/04-resume-parser.ts"

echo ""
echo "📁 检查第05章示例..."
check_file "examples/05-tool-system/01-basic-tool.ts"
check_file "examples/05-tool-system/02-weather-assistant.ts"
check_file "examples/05-tool-system/03-multi-tool.ts"
check_file "examples/05-tool-system/04-file-assistant.ts"

echo ""
echo "📁 检查实战项目..."
check_file "project/src/tools/weather.tool.ts"
check_file "project/src/tools/attractions.tool.ts"
check_file "project/src/tools/budget.tool.ts"
check_file "project/src/tools/index.ts"
check_file "project/src/schemas/travel-plan.schema.ts"
check_file "project/src/assistant.ts"
check_file "project/src/index.ts"

echo ""
echo "=================================================="
echo "📊 验证结果："
echo "   总文件数: $total"
echo -e "   成功: ${GREEN}$success${NC}"
if [ $failed -gt 0 ]; then
    echo -e "   失败: ${RED}$failed${NC}"
else
    echo -e "   失败: $failed"
fi
echo "=================================================="

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}✅ 所有文件验证通过！${NC}"
    exit 0
else
    echo -e "${RED}❌ 有文件缺失，请检查！${NC}"
    exit 1
fi
