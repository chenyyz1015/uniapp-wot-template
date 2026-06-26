# AGENTS.md

> 通用 AI Agent 指令文件，兼容 Cursor、Codex、GitHub Copilot 等主流 AI 开发工具。

## 项目概述

UniApp + Vue 3 + TypeScript 企业级移动端模板。技术栈：Wot UI、Pinia、Uni Network、UnoCSS、@wot-ui/router、vue-i18n。

**Node.js 20 LTS 必须**（见 `.nvmrc`）。

## 核心约定

### 自动引入（重要）

以下模块通过 `unplugin-auto-import` 自动引入，**禁止手动 import**：

- `vue` — ref, computed, watch, onMounted 等
- `pinia` — defineStore, storeToRefs 等
- `uni-app` — uni.\* API
- `vue-i18n` — useI18n 等
- `@wot-ui/router` — createRouter, useRouter, useRoute
- `@wot-ui/ui` — useToast, useDialog, useNotify, CommonUtil
- `src/composables/` — 所有组合式函数
- `src/stores/`、`src/stores/modules/` — 所有 Pinia Store

以下目录**需手动 import**：

- `src/api/` — 请求方法与业务 API
- `src/utils/` — 工具函数
- `src/i18n/` — i18n 实例（main.ts 注册）

### 组件自动引入

- Wot UI 组件（`wd-*`）
- `src/components/` 公共组件（`Com*` / `Biz*`）

### 权限控制

```vue
<wd-button v-if="hasPermission('demo:edit')">编辑</wd-button>
```

见 `.claude/rules/permissions.md`。

### API 请求约定

- HTTP 走 `src/api/request/`（Uni Network）
- 业务 API 放 `src/api/modules/`
- 401 清 Token 跳转 `/pages/auth/login`
- 环境变量 `VITE_` 前缀，H5 代理 `VITE_API_PROXY_MAP`

### 路由约定

- 页面由 `vite-plugin-uni-pages` 文件路由生成
- 守卫 `src/router/guard.ts`：白名单、Token 校验、取消 pending 请求
- `definePage()` 声明 layout / meta / style

### 缓存（Storage）

- 物理 key 前缀：`UNIAPP_WOT_TEMPLATE_`
- 逻辑 key：UPPER_SNAKE_CASE
- Pinia 持久化前缀：`PINIA_`

### 开发原则

1. 最小改动范围
2. 遵循现有代码风格
3. Vue 保持 ~3.4.x（不可升 3.5）

## AI 工具支持

本项目遵循 [Claude Code 官方推荐项目结构](https://docs.anthropic.com/en/docs/claude-code)，并兼容 Cursor、Codex 等主流 AI 开发工具。

```
├── design-system/                 # UI / AI 设计 SSOT
├── CLAUDE.md                      # Claude Code 项目指令
├── AGENTS.md                      # Codex / GitHub Copilot 通用项目指令
├── .agents/                       # commands / skills 统一管理（SSOT）
│   ├── commands/
│   └── skills/
├── .claude/                       # Claude Code（规则权威源）
│   ├── settings.json
│   ├── rules/
│   ├── commands/
│   ├── agents/
│   └── skills/
├── .codex/                        # Codex（与 .claude 目录对齐）
│   ├── config.toml
│   ├── prompts/
│   ├── agents/
│   └── skills/
└── .cursor/                       # Cursor（与 .claude 目录对齐）
    ├── rules/
    ├── commands/
    ├── agents/
    └── skills/
```

**对齐约定**：规则详文以 `.claude/rules/*.md` 为准，Cursor 侧为 `.cursor/rules/*.mdc` 摘要；`commands` / `skills` 多工具共享软链接到 `.agents/` 统一管理。软链接重建见 `scripts/setup-ai-symlinks.ps1`。

## 项目结构

```
vite/
├── helpers/                       # Vite 配置辅助函数
└── plugins/                       # Vite 插件

types/                             # 构建生成的类型声明

src/
├── static/                        # 静态资源
├── components/                    # 公共组件
├── composables/                   # 组合式函数
├── constants/                     # 全局常量
├── i18n/                          # 国际化
├── layouts/                       # 布局组件
├── router/                        # 全局路由
├── api/                           # HTTP 请求
├── stores/                        # Pinia
├── styles/                        # 全局样式
├── types/                         # 全局类型声明
├── utils/                         # 工具类函数
└── pages/                         # 页面组件
```

## 环境变量

按平台分目录，见 `envs/{h5|mp-weixin|app}/.env*`（配置见 `unh.config.ts`）。模板见 `.env.example`。

- 共享变量：`envs/{platform}/.env`
- 环境覆盖：`envs/{platform}/.env.development` / `.staging` / `.production`
- 本地覆盖：`envs/{platform}/.env.local` 或 `.env.{mode}.local`（`*.local` 已 gitignore）
- 类型声明：`types/env.d.ts`（`unh prepare` 或 dev/build 时自动生成）

## Git 提交规范

Conventional Commits
