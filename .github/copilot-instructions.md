# GitHub Copilot 指令

UniApp + Vue 3 + TypeScript 企业级移动端模板。请遵循以下约定：

- 使用 `<script setup lang="ts">` + `<style lang="scss" scoped>`
- 单文件组件顺序：script → template → style
- 页面：`src/pages/` + `definePage()`；布局：`src/layouts/`
- 公共组件：`Com*` / `Biz*` 前缀，自动引入；私有子组件 PascalCase，手动 import
- Composables：`src/composables/useXxx.ts`，禁止手动 import
- vue / pinia / uni-app / vue-i18n / @wot-ui/router / @wot-ui/ui / composables / store 禁止手动 import
- Wot UI `wd-*` 禁止手动 import
- 用户可见文案用 `useLocale()` 或 `useI18n()` 的 `t()`；页面标题用 `definePage` + `meta.titleKey`
- 静态资源：`src/static/`
- 缓存通过 `@/utils/auth`、`@/utils/locale` 读写；key 为 UPPER_SNAKE_CASE；禁止直接 `uni.setStorageSync` 裸 key
- HTTP 走 `src/api/request/`，业务 API 在 `src/api/modules/`
- 权限：`usePermission()` + `v-if`，不用 `v-permission` 指令
- 异步统一 `async/await`
- 样式：BEM + UnoCSS `@apply` + rpx（见 `.claude/rules/css-naming.md`）
- 详细规范见 `CLAUDE.md`、`.claude/rules/`
- AI commands / skills 权威源：`.agents/`（`.claude`、`.cursor`、`.codex` 通过软链接共享）
