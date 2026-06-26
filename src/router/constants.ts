/** 首页 path */
export const HOME_PATH = "/pages/home/index";

/** 登录页 path */
export const LOGIN_PATH = "/pages/auth/login";

/** 注册页 path */
export const REGISTER_PATH = "/pages/auth/register";

/** 403页 path */
export const FORBIDDEN_PATH = "/pages/error/403";

/** 404页 path */
export const NOT_FOUND_PATH = "/pages/error/404";

/** 500页 path */
export const SERVER_ERROR_PATH = "/pages/error/500";

/** 白名单路由 */
export const ROUTE_WHITE_LIST: string[] = [
  LOGIN_PATH,
  REGISTER_PATH,
  FORBIDDEN_PATH,
  NOT_FOUND_PATH,
  SERVER_ERROR_PATH,
];
