#!/bin/bash
# 项目校验：委托给根目录的 `pnpm verify`
# （typecheck + lint + test + build，单一事实来源）
set -euo pipefail

cd "$(dirname "$0")/.."

echo "🔍 运行 pnpm verify（typecheck + lint + test + build）..."
pnpm verify
echo "✅ 校验通过！"
