---
description: 分析并修复指定的 Issue 或 Bug
argument-hint: [issue-description-or-number]
---

# 修复 Issue

请分析并修复以下问题：$ARGUMENTS

## 工作流程

1. **理解问题** — 阅读 Issue 描述，定位相关代码
2. **诊断根因** — 追踪数据流和调用链
3. **实施修复** — 最小改动，遵循项目规范
4. **验证**
   - `npm run lint`
   - `npm run type-check`
   - `npm run dev:h5`（涉及页面/路由时抽样验证）

## 约束

- Vue 组件：`<script setup lang="ts">` + `<style lang="scss" scoped>`
- 单文件组件顺序：script → template → style
- 异步逻辑：`async/await`
- 页面目录 kebab-case，公共组件 `Com*` / `Biz*`
- 不手动 import auto-import 已覆盖的 API
- Wot UI 组件（`wd-*`）由插件自动引入

## 输出

- 根因分析
- 修改文件列表
- 验证步骤
