import { cancelAllPendingRequests } from "@/api/request/pending";
import { i18n } from "@/i18n";
import { getToken } from "@/utils/auth";
import { HOME_PATH, LOGIN_PATH, ROUTE_WHITE_LIST } from "./constants";

const t = i18n.global.t;

function isWhiteListed(path: string) {
  return ROUTE_WHITE_LIST.some((item) => path === item || path.startsWith(`${item}?`));
}

/** 注册路由守卫 */
export const setupRouterGuard = (router: ReturnType<typeof createRouter>) => {
  router.beforeEach(async (to, _from, next) => {
    cancelAllPendingRequests();

    const token = getToken();

    if (token) {
      if (to.path === LOGIN_PATH || to.path === "/pages/auth/register") {
        next({ path: HOME_PATH });
      } else {
        next();
      }
    } else if (isWhiteListed(to.path)) {
      next();
    } else {
      next({ path: LOGIN_PATH, query: { redirect: to.fullPath || to.path } });
    }
  });

  router.afterEach((to) => {
    const titleKey = to.meta?.titleKey as string | undefined;
    const appTitle = t("app.title");
    const title = titleKey ? `${t(titleKey)} | ${appTitle}` : appTitle;

    uni.setNavigationBarTitle({ title });
  });
};
