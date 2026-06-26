# 权限控制（多端统一）

保证 H5、小程序、App 行为一致。

## 推荐用法

使用 `usePermission()` composable + 模板 `v-if`：

```vue
<script setup lang="ts">
const { hasPermission, hasRole } = usePermission();
</script>

<template>
  <wd-button v-if="hasPermission('demo:edit')">编辑</wd-button>
  <wd-button v-if="hasPermission(['demo:edit', 'demo:delete'], 'every')">批量</wd-button>
  <wd-button v-if="hasRole('admin')">管理员</wd-button>
</template>
```

## API

| 方法                            | 说明                        |
| ------------------------------- | --------------------------- |
| `hasPermission(code)`           | 是否拥有权限码（默认 some） |
| `hasPermission(codes, 'every')` | 是否拥有全部权限码          |
| `hasRole(role)`                 | 是否拥有角色（默认 some）   |
| `hasRole(roles, 'every')`       | 是否拥有全部角色            |

## 超管约定

- 权限码 `*:*:*` 视为拥有全部权限
- 角色 `admin` 按业务约定处理（路由级见 `router.md`）

## 路由级权限

在 `definePage` 的 `meta` 中声明 `roles` / `permissions`，由 `router/guard.ts` 校验（待业务扩展）。

## 注意

- `usePermission` 已通过 auto-import，**禁止**手动 import
- 小程序端不支持 Vue 自定义指令，统一使用 composable 方案
