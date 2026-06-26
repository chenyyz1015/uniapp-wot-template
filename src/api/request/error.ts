import type { UnResponse } from "@uni-helper/uni-network";
import type { ApiErrorBody, ApiResponse, CustomRequestConfig, RequestError } from "../types/common";
import {
  HTTP_ERROR_MESSAGES,
  NETWORK_ERROR_MESSAGE,
  SUCCESS_BIZ_CODES,
  TIMEOUT_ERROR_MESSAGE,
  UNAUTHORIZED_BIZ_CODES,
  UNKNOWN_ERROR_MESSAGE,
  WARNING_BIZ_CODES,
} from "../constants";
import { handleUnauthorized } from "./auth";
import { isRequestCanceled } from "./pending";

/** 判断是否为统一业务响应结构 */
export function isApiResponse(data: unknown): data is ApiResponse {
  return typeof data === "object" && data !== null && "code" in data && "message" in data && "data" in data;
}

/** 从响应体提取错误信息 */
export function extractErrorMessage(data: unknown, fallback: string): string {
  return isApiResponse(data) && data.message ? data.message : fallback;
}

/** 根据 HTTP 状态码获取提示文案 */
export function getHttpErrorMessage(status: number, data?: unknown): string {
  const preset = HTTP_ERROR_MESSAGES[status];
  if (data) {
    const extracted = extractErrorMessage(data, "");
    if (extracted) {
      return extracted;
    }
  }
  return preset || UNKNOWN_ERROR_MESSAGE;
}

/** 创建标准化请求错误 */
export function createRequestError(
  message: string,
  options?: Partial<Pick<RequestError, "bizCode" | "httpStatus" | "responseData" | "canceled">>
): RequestError {
  const error = new Error(message) as RequestError;
  error.name = "RequestError";
  error.bizCode = options?.bizCode;
  error.httpStatus = options?.httpStatus;
  error.responseData = options?.responseData;
  error.canceled = options?.canceled;
  return error;
}

/** 显示错误提示 */
export function showError(message: string, config?: CustomRequestConfig) {
  if (config?.showError !== false) {
    const toast = useToast();
    toast.error(message);
  }
}

/** 显示警告提示 */
export function showWarning(message: string, config?: CustomRequestConfig) {
  if (config?.showError !== false) {
    const toast = useToast();
    toast.warning(message);
  }
}

/** 判断业务是否成功 */
export function isSuccessCode(code: number): boolean {
  return (SUCCESS_BIZ_CODES as readonly number[]).includes(code);
}

/** 判断是否需要重新登录 */
export function isUnauthorizedBizCode(code: number): boolean {
  return (UNAUTHORIZED_BIZ_CODES as readonly number[]).includes(code);
}

/** 判断业务是否警告 */
export function isWarningCode(code: number): boolean {
  return (WARNING_BIZ_CODES as readonly number[]).includes(code);
}

/** 处理 HTTP 层错误 */
export function handleHttpError(error: unknown): RequestError {
  const err = error as {
    config?: CustomRequestConfig;
    response?: UnResponse<ApiErrorBody>;
    errMsg?: string;
    message?: string;
  };

  const config = err.config;

  if (isRequestCanceled(config)) {
    return createRequestError("请求已取消", { canceled: true });
  }

  const message = err.errMsg || err.message || "";

  if (message.includes("timeout") || message.includes("超时")) {
    const requestError = createRequestError(TIMEOUT_ERROR_MESSAGE);
    showError(requestError.message, config);
    return requestError;
  }

  const response = err.response;
  if (!response) {
    const requestError = createRequestError(NETWORK_ERROR_MESSAGE);
    showError(requestError.message, config);
    return requestError;
  }

  const data = response.data;
  const httpStatus =
    response.status ?? (response as UnResponse<ApiErrorBody> & { statusCode?: number }).statusCode ?? 0;
  const errorMessage = getHttpErrorMessage(httpStatus, data);

  if (httpStatus === 401) {
    handleUnauthorized(errorMessage);
    return createRequestError(errorMessage, {
      httpStatus,
      responseData: data,
      bizCode: data?.code,
    });
  }

  showError(errorMessage, config);

  return createRequestError(errorMessage, {
    httpStatus,
    responseData: data,
    bizCode: data?.code,
  });
}
