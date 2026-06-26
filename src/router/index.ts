/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
import { pages } from "virtual:uni-pages";
import { setupRouterGuard } from "./guard";

function generateRoutes() {
  return pages.map((page) => ({
    ...page,
    path: `/${page.path}`,
  }));
}

const router = createRouter({
  routes: generateRoutes(),
});

setupRouterGuard(router);

export default router;
