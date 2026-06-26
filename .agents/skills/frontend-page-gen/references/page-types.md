# 常见页面速查

## 移动端 CRUD 列表页

- **区域**：搜索栏 + 操作按钮 + 列表（cell / card）+ 分页或下拉加载 + 新增/编辑弹窗 + 删除确认
- **组件**：`wd-input`、`wd-button`、`wd-cell`、`wd-cell-group`、`wd-popup`、`wd-loading`
- **状态**：loading（`wd-loading` 或按钮 `:loading`）、empty（自定义空态）、error（接口 catch 后 useToast）
- **权限**：操作按钮挂 `v-if="hasPermission('xxx')"`

## 表单页

- **区域**：表单区 + 提交/取消按钮
- **组件**：`wd-input`、`wd-textarea`、`wd-picker`、`wd-switch`、`wd-radio`、`wd-checkbox`
- **状态**：submitting（按钮 `:loading` 防重复提交）、validation（提交前校验 + toast 提示）

## 详情页

- **区域**：导航标题 + 详情卡片 + 操作按钮
- **组件**：`wd-cell-group`、`wd-cell`、`wd-tag`、`wd-divider`
- **状态**：loading（骨架/`wd-loading`）、404（数据不存在时 toast + 返回）

## 仪表盘页

- **区域**：统计卡片行 + 图表区 + 列表区
- **组件**：`wd-grid`、`wd-grid-item`、`wd-progress`、`wd-cell-group`
- **状态**：loading（骨架/`wd-loading`）、empty（无数据时的友好提示）

## TabBar 页

- **路由**：`definePage({ layout: "tabbar", name: "xxx" })`
- **配置**：`pages.config.ts` + `layouts/tabbar.vue`
- **导航**：编程式切换用 `router.pushTab({ name: "xxx" })`

## H5 落地页

- **区域**：Navbar + Hero + Features + Pricing + CTA + Footer
- **样式**：SCSS + UnoCSS `@apply` + BEM，UnoCSS shortcuts 如 `flex-center`
- **响应式**：H5 可用 `sm:` `md:` `lg:` 断点；小程序注意 rpx 适配
- **状态**：骨架屏 / 渐进加载、空状态插画
