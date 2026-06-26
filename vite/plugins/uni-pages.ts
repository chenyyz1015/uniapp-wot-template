import type { PluginOption } from "vite";
import UniHelperPages from "@uni-helper/vite-plugin-uni-pages";

export function uniPages(): PluginOption {
  return UniHelperPages({
    homePage: "pages/home/index",
    dts: "types/uni-pages.d.ts",
    exclude: ["**/components/**/*.*"],
  });
}
