# Uniapp Wot Template

基于 UniApp + Vue 3 + TypeScript 的企业级移动端项目模板，集成 Wot UI、Pinia、Uni Network 与 AI 开发工具配置。

## 特性

- **UniApp** — 一套代码，H5 / 小程序 / App 多端发布
- **Vue 3** — Composition API + `<script setup lang="ts">`（锁定 ~3.4.x）
- **Wot UI v2** — 移动端组件库，支持暗黑模式与主题定制
- **Pinia** — 状态管理 + `pinia-plugin-persistedstate`
- **Uni Network** — 类 Axios API，含 Token / 业务码 / 防重复提交
- **企业骨架** — 认证、路由守卫、i18n、权限 composable
- **@uni-helper/unh** — 统一 dev/build CLI，环境变量预加载
- **AI 开发工具** — AGENTS.md、CLAUDE.md、.claude/rules、security-review

## 快速开始

**环境要求：必须 Node.js 20 LTS**（见 `.nvmrc`：`20.20.2`）

> Node 22+ 在 Windows 上 dev 可能触发 `ERR_UNSUPPORTED_ESM_URL_SCHEME`。  
> npm 安装需 `.npmrc` 中 `legacy-peer-deps=true`（解决 `@dcloudio/types` peer 冲突）。

```bash
nvm use
npm install
npm run dev           # H5（unh，等同 dev:h5）
npm run dev:h5        # H5
npm run dev:wx        # 微信小程序别名
npm run dev:mp-weixin # 微信小程序
```

开发环境默认 `VITE_USE_MOCK=true`，无后端时可使用 mock 登录（admin / 任意密码）。

## 常用命令

```bash
npm run lint          # 代码检查
npm run lint:fix      # 自动修复
npm run format        # 格式化
npm run type-check    # TypeScript 类型检查
npm run build:h5      # H5 构建
npm run build:mp-weixin
```

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

## 文档

- 完整开发约定见 [`CLAUDE.md`](CLAUDE.md) + [`.claude/rules/`](.claude/rules/)
- UI 设计规范见 [`design-system/`](design-system/)
- 环境变量配置说明见 `.env.example`

## AI 工具

本项目预置 Claude Code、Codex、Cursor 三套工具配置，目录结构如下：

```
├── .claude/   # Claude Code（规则权威源）
├── .codex/    # Codex
├── .cursor/   # Cursor
└── .agents/   # commands / skills 统一管理
```

对齐约定：规则详文以 `.claude/rules/*.md` 为准；`commands` / `skills` 通过 `.agents/` 软链接共享。

## License

MIT
