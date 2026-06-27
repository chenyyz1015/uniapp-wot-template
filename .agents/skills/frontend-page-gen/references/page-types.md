# 常见页面速查

> 组件名称与权限写法以项目 `.claude/rules/` 为准；下列为通用页面结构与静态资源参考。

## 移动端 CRUD 列表页

- **区域**：搜索栏 + 操作按钮 + 列表（cell / card）+ 分页或下拉加载 + 新增/编辑弹窗 + 删除确认
- **组件**：搜索输入、操作按钮、列表容器、弹窗、加载指示器（见项目 UI 库）
- **状态**：loading、empty（自定义空态）、error（接口失败反馈）
- **权限**：敏感操作按项目 permissions 规范控制
- **常见静态资源**（openai-image MCP 生成）：
  - 空态插图（如「暂无数据」场景，`src/static/illustrations/`）
  - 列表项默认头像（`src/static/avatars/`）
  - 操作图标：新增、编辑、删除（`src/static/icons/`，若不用 iconfont）

## 表单页

- **区域**：表单区 + 提交/取消按钮
- **组件**：文本输入、选择器、开关、单选/多选等（见项目 UI 库）
- **状态**：submitting（防重复提交）、validation（提交前校验 + 错误提示）
- **常见静态资源**（openai-image MCP 生成）：
  - 提交成功插图（可选，`src/static/illustrations/`）
  - 表单引导插图（可选，复杂表单场景）

## 详情页

- **区域**：导航标题 + 详情卡片 + 操作按钮
- **组件**：详情列表、卡片、分隔线等（见项目 UI 库）
- **状态**：loading（骨架/加载指示）、404（数据不存在时提示 + 返回）
- **常见静态资源**（openai-image MCP 生成）：
  - 404/数据不存在插图（`src/static/illustrations/`）
  - 实体默认封面图/头像（`src/static/avatars/` 或 `src/static/illustrations/`）

## 仪表盘页

- **区域**：统计卡片行 + 图表区 + 列表区
- **组件**：卡片、表格/列表、网格布局（见项目 UI 库）
- **状态**：loading、empty（无数据时的友好提示）
- **常见静态资源**（openai-image MCP 生成）：
  - 统计卡片装饰图标（各指标类型，`src/static/icons/`）
  - 空态插图（`src/static/illustrations/`）
  - 品牌/IP 欢迎图（可选，`src/static/ip/`）

## TabBar 页

- **路由**：按项目 router 规范声明 TabBar 页面（见 `.claude/rules/router.md`）
- **导航**：编程式 Tab 切换按项目路由 API 实现
- **常见静态资源**（openai-image MCP 生成）：
  - Tab 图标（选中/未选中态，若不用 iconfont，`src/static/icons/`）
  - 页面顶部品牌装饰（可选，`src/static/ip/`）

## H5 落地页

- **区域**：Navbar + Hero + Features + Pricing + CTA + Footer
- **样式**：按项目 CSS 规范（BEM / utility / SCSS 等，见 `.claude/rules/css-naming.md`）
- **响应式**：按目标平台标注断点（如 H5 `sm:`/`md:`，小程序 rpx）
- **状态**：骨架屏 / 渐进加载、空状态插画
- **常见静态资源**（openai-image MCP 生成）：
  - Hero 主视觉配图（`src/static/illustrations/`）
  - Feature 区块图标 ×3-4（`src/static/icons/`）
  - Footer 装饰元素（可选）
  - 品牌/IP 形象（`src/static/ip/`）
