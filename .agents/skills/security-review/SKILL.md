---
name: security-review
description: 对 UniApp 移动端代码变更进行安全审查，检查 XSS、敏感信息泄露、认证授权等风险。在用户进行安全审查、代码审计、或涉及认证/授权/数据处理时使用。
---

# 安全审查（UniApp）

## 审查清单

### 1. XSS

- [ ] H5 用户输入避免 `v-html`；必须用时做消毒
- [ ] 小程序 `rich-text` 内容来源可信
- [ ] URL 参数不直接插入 DOM

### 2. 敏感信息

- [ ] Token / API Key 不硬编码
- [ ] 敏感配置放 `.env.local`（已 gitignore），不提交 `.env.*`
- [ ] 不在 console 输出 Token / 用户信息

### 3. 认证与授权

- [ ] Token 通过 `src/utils/auth.ts`（key：`ACCESS_TOKEN`）
- [ ] 存储前缀 `UNIAPP_WOT_TEMPLATE_`
- [ ] 请求拦截器注入 Authorization
- [ ] 路由守卫 `src/router/guard.ts` 完整
- [ ] 按钮级权限用 `usePermission()` + `v-if`（不用自定义指令）

### 4. 请求安全

- [ ] 上传文件校验类型与大小
- [ ] HTTPS 生产环境 API

### 5. 依赖

- [ ] 无已知高危 CVE 依赖

## 输出格式

```
## 安全审查报告

### 🔴 高危
### 🟡 中危
### 🟢 低危 / 建议
### ✅ 通过项
```
