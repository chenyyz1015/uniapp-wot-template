import type { UnResponse } from "@uni-helper/uni-network";
import type { CustomRequestConfig } from "../types/common";
import { getToken } from "@/utils/auth";
import { checkSubmitGuard } from "@/utils/submit-guard";
import { UNKNOWN_ERROR_MESSAGE } from "../constants";
import { createRequestError, handleHttpError } from "./error";
import { service } from "./instance";
import { cancelDuplicateRequest, registerRequest, removePendingRequest } from "./pending";
import { handleBizResponse } from "./response";

/** 注册请求拦截器 */
export function setupRequestInterceptor() {
  service.interceptors.request.use(
    (config) => {
      const requestConfig = config as CustomRequestConfig;
      requestConfig.showError ??= true;
      requestConfig.skipAuth ??= false;
      requestConfig.skipBizCheck ??= false;
      requestConfig.cancelDuplicate ??= true;
      requestConfig.preventRepeatSubmit ??= true;

      if (!requestConfig.skipAuth) {
        const token = getToken();
        if (token) {
          requestConfig.headers = {
            ...requestConfig.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }

      requestConfig.headers = {
        ...requestConfig.headers,
        "X-Request-Time": String(Date.now()),
      };

      const method = requestConfig.method?.toUpperCase();
      if (requestConfig.preventRepeatSubmit && (method === "POST" || method === "PUT" || method === "PATCH")) {
        checkSubmitGuard(requestConfig.url ?? "", requestConfig.data, requestConfig.repeatSubmitInterval);
      }

      registerRequest(requestConfig);
      cancelDuplicateRequest(requestConfig);

      return requestConfig;
    },
    (error) => Promise.reject(createRequestError(UNKNOWN_ERROR_MESSAGE, { responseData: error }))
  );
}

/** 注册响应拦截器 */
export function setupResponseInterceptor() {
  service.interceptors.response.use(
    (response) => {
      removePendingRequest(response.config as CustomRequestConfig);

      const data = handleBizResponse(response);
      return { ...response, data } as UnResponse;
    },
    (error) => {
      if (error?.config) {
        removePendingRequest(error.config as CustomRequestConfig);
      }
      return Promise.reject(handleHttpError(error));
    }
  );
}

/** 初始化所有拦截器 */
export function setupInterceptors() {
  setupRequestInterceptor();
  setupResponseInterceptor();
}
