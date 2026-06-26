import type { CustomRequestConfig } from "../types/common";

/** 进行中的请求（用于取消重复请求与路由切换时批量取消） */
const pendingRequests = new Map<string, CustomRequestConfig>();

/** 生成请求唯一标识 */
export function getRequestKey(config: CustomRequestConfig): string {
  const { method = "GET", url, params, data } = config;
  const paramStr = params ? JSON.stringify(params) : "";
  const dataStr = data ? JSON.stringify(data) : "";
  return [method.toUpperCase(), url, paramStr, dataStr].join("&");
}

/** 移除 pending 请求 */
export function removePendingRequest(config?: CustomRequestConfig) {
  const key = config?._requestKey;
  if (key) {
    pendingRequests.delete(key);
  }
}

/** 取消所有待处理的请求 */
export function cancelAllPendingRequests() {
  for (const config of pendingRequests.values()) {
    config._canceled = true;
  }
  pendingRequests.clear();
}

/** 注册请求 */
export function registerRequest(config: CustomRequestConfig) {
  const requestKey = getRequestKey(config);
  config._requestKey = requestKey;
  pendingRequests.set(requestKey, config);
}

/** 取消重复请求 */
export function cancelDuplicateRequest(config: CustomRequestConfig) {
  const cancelDuplicate = config.cancelDuplicate ?? true;
  if (!cancelDuplicate) {
    return;
  }

  const requestKey = getRequestKey(config);
  const existing = pendingRequests.get(requestKey);
  if (existing) {
    existing._canceled = true;
    pendingRequests.delete(requestKey);
  }
}

/** 判断请求是否已取消 */
export function isRequestCanceled(config?: CustomRequestConfig) {
  return Boolean(config?._canceled);
}
