# 代码格式化配置

## 配置说明

本项目已配置自动格式化功能，确保代码风格一致。

## 已安装的工具

- ESLint - 代码检查和修复
- Prettier - 代码格式化
- VS Code 设置 - 保存时自动格式化

## 使用方法

### 1. 保存时自动格式化

在 VS Code 中，代码保存时会自动格式化：

- 使用 Prettier 格式化
- 运行 ESLint 检查并修复

### 2. 手动格式化

运行以下命令格式化所有文件：

```bash
pnpm format
```

### 3. 代码检查

运行以下命令检查并修复代码：

```bash
pnpm lint
```

## 配置文件

- `.eslintrc.js` - ESLint 配置
- `.prettierrc.json` - Prettier 配置
- `.prettierignore` - 忽略格式化的文件
- `.vscode/settings.json` - VS Code 设置

## 规则

- 使用单引号
- 每行最多 100 个字符
- 使用 2 个空格缩进
- 末尾加分号
- 使用 LF 换行符

## 忽略的文件

- build/ 和 dist/ 目录
- node_modules/ 目录
- 配置文件
- 测试覆盖率文件
- 环境变量文件

## 注意事项

- 确保在 VS Code 中安装了 Prettier 插件
- 保存文件时会自动应用格式化
- 如果出现格式化问题，可以运行 `pnpm format` 手动修复
