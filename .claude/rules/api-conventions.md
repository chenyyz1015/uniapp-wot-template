# API 约定

## 目录结构

```
src/api/
├── request/             # 请求封装目录
│   ├── index.ts         # 入口：HTTP 方法导出
│   ├── instance.ts      # Uni Network 实例创建
│   ├── interceptors.ts  # 请求/响应拦截器
│   ├── pending.ts       # 重复请求取消
│   ├── auth.ts          # Token 与未授权处理
│   ├── error.ts         # HTTP 错误与 RequestError
│   └── response.ts      # 业务响应校验
├── constants.ts         # 常量配置
├── modules/             # 按业务域拆分的 API 模块
│   └── auth.ts
└── types/               # 接口类型定义（模块名.d.ts）
    ├── common.d.ts
    └── auth.d.ts
```

## 请求封装

所有 HTTP 请求通过 `src/api/request/` 统一封装，基于 **@uni-helper/uni-network**。对外从 `@/api/request` 引入。

### 内置能力

| 能力      | 说明                                                    |
| --------- | ------------------------------------------------------- |
| 请求配置  | Token 注入、`X-Request-Time`、超时、重复请求取消        |
| HTTP 错误 | 按状态码映射提示（400/401/403/404/500 等）              |
| 业务错误  | 校验 `code` 字段，非成功码统一提示并抛出 `RequestError` |
| 未授权    | HTTP 401 或业务未授权码，清除 Token 并跳转登录          |
| 网络异常  | 超时、断网、请求取消等场景独立提示                      |
| 防重复提交 | POST/PUT/PATCH 会话级 submitGuard                      |

### HTTP 方法

| 方法 | 说明 |
| ---- | ---- |
| `get` / `post` / `put` / `patch` / `del` | 常规 REST 请求 |
| `download` | 业务文件下载（GET + `arraybuffer`，默认 `skipBizCheck`） |
| `upload` | 文件上传（`uni.uploadFile`，需 `filePath`/`name`/`formData`） |

### 扩展配置 `CustomRequestConfig`

| 字段                  | 类型      | 默认值  | 说明                     |
| --------------------- | --------- | ------- | ------------------------ |
| `showError`           | `boolean` | `true`  | 是否自动弹出错误提示     |
| `skipAuth`            | `boolean` | `false` | 是否跳过 Token 注入      |
| `skipBizCheck`        | `boolean` | `false` | 是否跳过业务 `code` 校验 |
| `cancelDuplicate`     | `boolean` | `true`  | 是否取消重复请求         |
| `preventRepeatSubmit` | `boolean` | `true`  | POST/PUT/PATCH 防重复提交 |
| `repeatSubmitInterval`| `number`  | `1000`  | 防重复提交间隔（毫秒）   |

```typescript
import { download, get, patch, post, upload } from "@/api/request";

const result = await get<AjaxResult<User[]>>("/users");

await post("/auth/login", body, { skipAuth: true });

await patch("/user/1", { name: "new" });

const buffer = await download("/common/download", { fileName: "a.pdf" });

await upload("/common/upload", { filePath, name: "file", formData: { type: "avatar" } });
```

### 错误对象 `RequestError`

- `message` — 错误提示
- `bizCode` — 业务错误码
- `httpStatus` — HTTP 状态码
- `responseData` — 原始响应体
- `canceled` — 是否为取消的请求

错误提示通过 Wot UI `useToast()` 展示（已 auto-import）。

## 响应格式

```typescript
interface ApiResponse<T = unknown> {
  code: number; // 0 或 200 表示成功
  data: T;
  message: string;
}
```

## 环境变量

| 变量                 | 说明                         |
| -------------------- | ---------------------------- |
| `VITE_APP_NAME`      | 项目名                       |
| `VITE_APP_TITLE`     | 应用展示标题                 |
| `VITE_API_BASE_URL`  | API 基础路径                 |
| `VITE_API_TIMEOUT`   | 请求超时（毫秒）             |
| `VITE_API_PROXY_MAP` | H5 开发代理（JSON 数组）     |
| `VITE_USE_MOCK`      | 开发 Mock（无后端时可 true） |
| `VITE_ENV_NAME`      | 环境标识                     |

配置文件：`envs/{platform}/.env` + `.env.{development|staging|production}`；本地覆盖用 `envs/{platform}/.env.local`（已 gitignore）。模板见 `.env.example`。

`@uni-helper/unh` 在 dev/build 前按平台与 mode 加载环境变量（见 `unh.config.ts`）。Vite 侧通过 `vite.config.ts` 的 `loadEnv(envs/{platform})` 读取 H5 代理配置，并 fallback `process.env`（unh 已注入）。

## 命名约定

| 类型         | 规范                  | 示例                         |
| ------------ | --------------------- | ---------------------------- |
| API 模块文件 | 业务域 camelCase      | `auth.ts`                    |
| 类型定义文件 | 模块名.d.ts           | `auth.d.ts`                  |
| API 函数     | 动词 + 名词 camelCase | `getInfo`、`login`           |

## 错误处理

- **401 / 未授权**：清除 Token，跳转 `/pages/auth/login?redirect=...`
- **业务层**：`async/await` + `try/catch`，禁止 `.then()` / `.catch()` 链式调用
- **路由切换**：`router/guard.ts` 调用 `cancelAllPendingRequests()`
