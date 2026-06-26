import { resolve } from "node:path";
import { cwd, env } from "node:process";
import { isH5, platform as uniPlatform } from "@uni-helper/uni-env";
import { defineConfig, loadEnv } from "vite";
import { manualChunks, parseProxy } from "./vite/helpers";
import { plugins } from "./vite/plugins";

export default defineConfig(({ mode, command }) => {
  const platform = uniPlatform ?? "h5";
  const envDir = resolve(cwd(), "envs", platform);
  const viteEnv = loadEnv(mode, envDir, ["VITE_"]);
  const proxy = parseProxy(env.VITE_API_PROXY_MAP ?? viteEnv.VITE_API_PROXY_MAP ?? "");

  /** H5 / Web SPA 构建时启用 Rollup vendor 分包；小程序 / App 不走此策略 */
  const enableSpaChunks = isH5 && command === "build";

  return {
    base: "./",
    optimizeDeps: {
      exclude: ["@wot-ui/ui"],
    },
    plugins,
    ...(enableSpaChunks && {
      build: {
        chunkSizeWarningLimit: 800,
        rollupOptions: {
          output: { manualChunks },
        },
      },
    }),
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    server: {
      port: 5173,
      host: true,
      open: true,
      proxy,
    },
  };
});
