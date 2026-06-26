# CSS 类名命名规范（UniApp + Wot UI）

## 总原则

1. 模板使用语义化 **BEM** 类名，避免长串 UnoCSS 原子类堆叠
2. 在 `<style lang="scss" scoped>` 内用 **`@apply`** 注入 UnoCSS 工具类
3. 尺寸优先 **rpx**（移动端）；H5 可用 rem / px 按需

## BEM

| 部分 | 格式 | 示例 |
|------|------|------|
| Block | `kebab-case` | `hero`、`user-card` |
| Element | `block__element` | `hero__title` |
| Modifier | `block--modifier` | `hero__cta--primary` |

## SMACSS 布局层

跨区块结构类使用 `l-` 前缀：

- `l-container`、`l-section`、`l-grid`

## UnoCSS + Wot 预设

- 全局 `uno.css` 已引入
- Wot 主题变量：`@wot-ui/ui/styles/theme`
- 模板可用 Wot 预设类如 `wot-text-text-main`、`wot-bg-filled-oppo`
- 动态样式优先 BEM 修饰符 + `:class`，禁止拼接长 utility 字符串

## 第三方组件

- Wot UI：BEM 类挂在根节点；穿透用 `:deep()`
- 覆盖 Wot 变量优先 `wd-config-provider` 的 `theme-vars`

## 示例

```vue
<template>
  <view class="hero">
    <text class="hero__title">{{ title }}</text>
  </view>
</template>

<style lang="scss" scoped>
.hero {
  @apply px-3 py-4;

  &__title {
    @apply text-5 font-bold wot-text-text-main;
  }
}
</style>
```
