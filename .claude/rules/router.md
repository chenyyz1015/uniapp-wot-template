# 路由约定（@wot-ui/router + vite-plugin-uni-pages）

## 页面定义

页面文件位于 `src/pages/`，通过 `definePage()` 声明元信息：

```typescript
definePage({
  name: "login",           // 路由 name，tabbar 切换用
  type: "home",            // 仅首页需要
  layout: "default",       // default | tabbar
  meta: {
    titleKey: "router.login",
    roles: ["admin"],      // 可选，路由级 RBAC
    permissions: ["a:b:c"],
  },
  style: {
    navigationBarTitleText: "登录",
  },
});
```

## 路由实例

- `src/router/index.ts`：从 `virtual:uni-pages` 生成 routes
- `src/router/guard.ts`：Token 校验、白名单、取消 pending 请求
- `src/router/constants.ts`：路径常量

## 路径常量

| 常量 | 路径 |
|------|------|
| `HOME_PATH` | `/pages/home/index` |
| `LOGIN_PATH` | `/pages/auth/login` |
| `REGISTER_PATH` | `/pages/auth/register` |
| 白名单 | login、register、403、404、500 |

## 守卫逻辑

1. 每次导航 `cancelAllPendingRequests()`
2. 无 Token + 非白名单 → 跳转 `LOGIN_PATH?redirect=...`
3. 有 Token + 访问 login/register → 重定向 `HOME_PATH`
4. `afterEach` 设置导航栏标题（i18n）

## 编程式导航

```typescript
const router = useRouter();
router.push({ path: "/pages/home/index" });
router.replace({ path: LOGIN_PATH, query: { redirect } });
router.pushTab({ name: "home" }); // TabBar 页
```

## TabBar

- 配置：`pages.config.ts` + 自定义 `layouts/tabbar.vue`
- Tab 页必须使用 `layout: "tabbar"`

## 权限扩展

路由 `meta.roles` / `meta.permissions` 可在 `guard.ts` 中扩展校验，配合 `usePermission()` 与 `utils/permission.ts`。
