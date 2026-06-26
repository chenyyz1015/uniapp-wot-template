import type { UnData, UnParams } from "@uni-helper/uni-network";
import type { CustomRequestConfig } from "../types/common";
import { service } from "./instance";
import { setupInterceptors } from "./interceptors";

setupInterceptors();

/** 统一请求方法 */
export async function request<T = unknown, D = UnData>(config: CustomRequestConfig<T, D>): Promise<T> {
  const response = await service.request<T, D>(config);
  return response.data as T;
}

export async function get<T = unknown>(url: string, params?: UnParams, config?: CustomRequestConfig<T>) {
  return request<T>({ ...(config ?? {}), method: "GET", url, params });
}

export async function post<T = unknown, D = UnData>(url: string, data?: D, config?: CustomRequestConfig<T, D>) {
  return request<T, D>({ ...(config ?? {}), method: "POST", url, data });
}

export async function put<T = unknown, D = UnData>(url: string, data?: D, config?: CustomRequestConfig<T, D>) {
  return request<T, D>({ ...(config ?? {}), method: "PUT", url, data });
}

export async function patch<T = unknown, D = UnData>(url: string, data?: D, config?: CustomRequestConfig<T, D>) {
  return request<T, D>({ ...(config ?? {}), method: "PATCH", url, data });
}

export async function del<T = unknown>(url: string, params?: UnParams, config?: CustomRequestConfig<T>) {
  return request<T>({ ...(config ?? {}), method: "DELETE", url, params });
}

/** 下载文件（业务 API，GET + arraybuffer） */
export async function download<T = ArrayBuffer>(url: string, params?: UnParams, config?: CustomRequestConfig<T>) {
  return request<T>({
    ...(config ?? {}),
    method: "GET",
    url,
    params,
    responseType: "arraybuffer",
    skipBizCheck: true,
  });
}

export interface UploadOptions {
  filePath?: string;
  file?: File;
  name?: string;
  formData?: Record<string, unknown>;
  fileType?: "image" | "video" | "audio";
}

/** 上传文件（uni.uploadFile） */
export async function upload<T = unknown>(url: string, options: UploadOptions, config?: CustomRequestConfig<T>) {
  const response = await service.upload<T>(url, {
    ...(config ?? {}),
    ...options,
    skipBizCheck: config?.skipBizCheck ?? true,
  });
  return response.data as T;
}

export default service;
