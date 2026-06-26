---
description: 对当前变更或指定文件进行代码审查，检查代码质量、潜在 Bug 和最佳实践
argument-hint: [file-or-directory]
---

# 代码审查

请对 $ARGUMENTS 进行全面的代码审查。

## 审查清单

1. **代码质量**
   - ESLint / Stylelint / Prettier 规范
   - TypeScript 类型完整、准确
   - 无重复逻辑或可提取的公共模块

2. **UniApp + Vue 3 最佳实践**
   - `<script setup lang="ts">` + `<style lang="scss" scoped>`
   - 单文件组件顺序：script → template → style
   - 异步逻辑使用 `async/await`（禁止 `.then()` / `.catch()`）
   - 页面使用 `definePage()` 声明 layout / meta / style
   - 双向绑定优先 `defineModel`

3. **自动引入规范**
   - vue / pinia / uni-app / vue-i18n 未手动 import
   - `@wot-ui/router`、`@wot-ui/ui` 未手动 import
   - composables / store 未手动 import
   - Wot UI `wd-*` 与 `src/components/` 公共组件未手动 import

4. **目录与命名**
   - 页面：`src/pages/` 按业务域划分
   - 公共组件：`Com*` / `Biz*` 前缀
   - 私有子组件：PascalCase，放 `components/` 子目录，手动 import

5. **权限与安全**
   - 使用 `usePermission()` + `v-if`，不用自定义指令
   - Token 通过 `@/utils/auth` 读写
   - API 错误有适当处理

6. **可维护性**
   - 命名清晰，复杂逻辑有必要注释

## 输出格式

- 🔴 **Critical** — 必须修复
- 🟡 **Warning** — 建议修复
- 🟢 **Suggestion** — 可选优化

每个问题需包含：文件路径、问题描述、修复建议。
