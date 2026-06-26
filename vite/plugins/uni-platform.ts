import type { PluginOption } from "vite";
import UniPlatform from "@uni-helper/vite-plugin-uni-platform";

export function uniPlatform(): PluginOption {
  return UniPlatform();
}
