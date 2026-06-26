import type { AjaxResult } from "../types/common";
import type { LoginParams, LoginPhoneParams, LoginResult, UserInfoResult } from "@/api/types/auth";
import * as request from "@/api/request";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

/** 登录 */
export function login(data: LoginParams | LoginPhoneParams) {
  if (useMock) {
    return Promise.resolve({
      code: 200,
      message: "ok",
      data: { token: "mock-token" },
    } satisfies AjaxResult<LoginResult>);
  }
  return request.post<AjaxResult<LoginResult>>("/login", data, { skipAuth: true });
}

/** 获取当前用户信息 */
export function getInfo() {
  if (useMock) {
    return Promise.resolve({
      code: 200,
      message: "ok",
      data: {
        id: "1",
        username: "admin",
        nickname: "管理员",
        avatar: "",
        email: "admin@example.com",
        phone: "13800000000",
        roles: ["admin"],
        permissions: ["*:*:*"],
      },
    } satisfies AjaxResult<UserInfoResult>);
  }
  return request.get<AjaxResult<UserInfoResult>>("/getInfo");
}

/** 登出 */
export function logout() {
  if (useMock) {
    return Promise.resolve({ code: 200, message: "ok", data: null });
  }
  return request.post("/logout");
}
