# Uniapp Wot Template

基于 UniApp + Vue 3 + TypeScript 的企业级移动端项目模板，集成 Wot UI、Pinia、Uni Network 与 AI 开发工具配置。

## 环境要求

**必须 Node.js 20 LTS**（`.nvmrc` → `20.20.2`，`package.json` engines：`>=20.19.0 <21.0.0`）

```bash
nvm use
npm install
```

## 技术栈

| 类别 | 技术                                   |
| ---- | -------------------------------------- |
| 框架 | UniApp + Vue 3 (~3.4.x)                |
| UI   | Wot UI v2                              |
| 状态 | Pinia + persisted-state                |
| HTTP | @uni-helper/uni-network                |
| 路由 | @wot-ui/router + vite-plugin-uni-pages |
| i18n | vue-i18n                               |
| 样式 | UnoCSS                                 |

## AI 工具支持

本项目遵循 [Claude Code 官方推荐项目结构](https://docs.anthropic.com/en/docs/claude-code)，并兼容 Cursor、Codex 等主流 AI 开发工具。

```
├── design-system/                 # UI / AI 设计 SSOT
├── CLAUDE.md                      # Claude Code 项目指令
├── AGENTS.md                      # Codex / GitHub Copilot 通用项目指令
├── .claude/                       # Claude Code（规则与命令权威源）
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

**对齐约定**：规则详文以 `.claude/rules/*.md` 为准，Cursor 侧为 `.cursor/rules/*.mdc` 摘要；`commands` / `skills` 多工具共享软链接到 `.agents/` 统一管理。

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

## 开发约定

| 规则文件             | 内容                       |
| -------------------- | -------------------------- |
| `code-style.md`      | 组件命名、自动引入、Wot UI |
| `api-conventions.md` | Uni Network 请求封装       |
| `css-naming.md`      | BEM、UnoCSS、rpx           |
| `router.md`          | definePage、路由守卫       |
| `permissions.md`     | 权限 composable            |

## 常用命令

```bash
npm run dev:h5
npm run dev:mp-weixin
npm run lint
npm run type-check
```

CLI 由 [@uni-helper/unh](https://uni-helper.js.org/unh) 封装，配置见 `unh.config.ts`。

## Git 提交规范

Conventional Commits
