# 代码风格规范（UniApp）

## 通用

- 2 空格缩进，LF 换行，ESModule
- 优先 `const`，避免 `var`
- TypeScript strict，避免 `any`

## Vue 单文件组件

- `<script setup lang="ts">` + `<style lang="scss" scoped>`
- 顺序：script → template → style
- Props：`defineProps`；Emits：kebab-case 事件名
- 双向绑定优先 `defineModel`
- 单文件宜控制在约 300 行以内，超出按职责拆分

## 目录与命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 页面 | `src/pages/` 业务域目录 | `pages/auth/login.vue` |
| 布局 | `src/layouts/` | `layouts/tabbar.vue` |
| 公共组件 | PascalCase 目录 + `Com`/`Biz` 前缀 | `ComXxx/index.vue` |
| 私有子组件 | PascalCase，放 `components/` | 手动 import |
| Composable | `useXxx.ts`，箭头函数导出 | `usePermission.ts` |
| Store | `store/modules/`，`useXxxStore` | `store/modules/user.ts` |

## 页面路由

- 使用 `definePage()` 声明 `name`、`layout`、`meta`、`style`
- 编程式导航：`@wot-ui/router` 的 `useRouter` / `useRoute`

```typescript
definePage({
  name: "home",
  type: "home",
  layout: "tabbar",
  meta: { titleKey: "router.home" },
  style: { navigationBarTitleText: "首页" },
});
```

## 自动引入（禁止手动 import）

- `vue`、`pinia`、`uni-app`、`vue-i18n`
- `@wot-ui/router`、`@wot-ui/ui`（useToast 等）
- `src/composables/`、`src/store/`、`src/store/modules/`
- Wot UI `wd-*`、`src/components/` 公共组件

## 需手动 import

- `src/api/`、`src/utils/`
- 布局、页面私有子组件
- `src/i18n/index.ts`（main.ts 注册）

## 异步

- 统一 `async/await` + `try/catch`
- 禁止 `.then()` / `.catch()` 链式调用

## Storage

- 前缀：`UNIAPP_WOT_TEMPLATE_`
- 逻辑 key：UPPER_SNAKE_CASE
- 业务通过 `@/utils/auth`、`@/utils/locale` 读写
- Pinia 持久化：`store/persisted-state.ts`，key 前缀 `PINIA_`

## i18n

- 语言包：`src/i18n/locales/`
- 切换语言：`useLocale()`
- 用户可见文案用 `t('key')`，禁止硬编码

## 权限

- `usePermission()` + `v-if`，见 `.claude/rules/permissions.md`
- 禁止 `v-permission` / `v-role` 自定义指令

## Pinia

- Setup Store + `pinia-plugin-persistedstate`
- 临时状态用 `persist.pick` / `omit` 排除
