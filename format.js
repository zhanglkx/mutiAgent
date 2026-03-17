#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('📝 正在格式化代码...');

try {
  execSync('pnpm prettier --write "**/*.{ts,tsx,js,jsx,json,md}"', { stdio: 'inherit' });
  console.log('✅ 代码格式化完成！');
} catch (error) {
  console.error('❌ 格式化失败:', error.message);
  process.exit(1);
}