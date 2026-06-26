import type { UnResponse } from "@uni-helper/uni-network";
import type { CustomRequestConfig } from "../types/common";
import { UNKNOWN_ERROR_MESSAGE } from "../constants";
import { getUnauthorizedMessage, handleUnauthorized } from "./auth";
import {
  createRequestError,
  isApiResponse,
  isSuccessCode,
  isUnauthorizedBizCode,
  isWarningCode,
  showError,
  showWarning,
} from "./error";

function getHttpStatus(response: UnResponse<unknown>) {
  return response.status ?? (response as UnResponse & { statusCode?: number }).statusCode ?? 200;
}

/** 处理业务层响应 */
export function handleBizResponse<T>(response: UnResponse<T>): T {
  const { config, data } = response;
  const requestConfig = config as CustomRequestConfig;
  const statusCode = getHttpStatus(response);

  const responseType = requestConfig.responseType;
  if (responseType === "arraybuffer") {
    return data as T;
  }

  if (!isApiResponse(data)) {
    return data as T;
  }

  if (requestConfig.skipBizCheck) {
    return data as T;
  }

  const { code, message } = data;

  if (isSuccessCode(code)) {
    return data as T;
  }

  if (isUnauthorizedBizCode(code)) {
    const errorMessage = getUnauthorizedMessage(message);
    handleUnauthorized(errorMessage);
    throw createRequestError(errorMessage, {
      bizCode: code,
      httpStatus: statusCode,
      responseData: data,
    });
  }

  const errorMessage = message || UNKNOWN_ERROR_MESSAGE;
  if (isWarningCode(code)) {
    showWarning(errorMessage, requestConfig);
  } else {
    showError(errorMessage, requestConfig);
  }

  throw createRequestError(errorMessage, {
    bizCode: code,
    httpStatus: statusCode,
    responseData: data,
  });
}
