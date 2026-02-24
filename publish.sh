#!/bin/bash
# Schema-Gen 发布辅助脚本
# 使用方法: ./publish.sh
# 需要先完成 npm 登录

set -e

echo "=== Schema-Gen 发布脚本 ==="
echo ""

# 检查是否在正确目录
if [ ! -f "package.json" ]; then
    echo "错误: 请在 schema-gen 目录下运行此脚本"
    exit 1
fi

# 检查构建
echo "[1/3] 检查构建..."
if [ ! -d "dist" ]; then
    echo "构建不存在，正在构建..."
    npm run build
fi

# 检查 npm 登录
echo "[2/3] 检查 npm 登录状态..."
npm whoami || {
    echo "错误: 请先登录 npm"
    echo "运行: npm adduser"
    exit 1
}

# 发布
echo "[3/3] 发布到 npm..."
npm publish --access public

echo ""
echo "=== 发布成功! ==="
echo ""
echo "下一步 (可选):"
echo "1. 创建 GitHub Release: gh release create v1.0.0 --generate-notes"
echo "2. 推送到 GitHub: git remote add origin https://github.com/yourname/schema-gen.git"
