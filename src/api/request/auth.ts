import { LOGIN_PATH } from "@/router/constants";
import { removeToken } from "@/utils/auth";
import { HTTP_ERROR_MESSAGES } from "../constants";

/** 处理未授权：清除 Token 并跳转登录 */
export function handleUnauthorized(message?: string) {
  if (message) {
    const toast = useToast();
    toast.warning(message);
  }

  removeToken();

  const router = useRouter();
  const route = useRoute();
  const redirect = route.fullPath || route.path;

  if (route.path !== LOGIN_PATH) {
    router.replace({ path: LOGIN_PATH, query: { redirect } });
  }
}

/** 未授权默认提示 */
export function getUnauthorizedMessage(message?: string) {
  return message || HTTP_ERROR_MESSAGES[401];
}
