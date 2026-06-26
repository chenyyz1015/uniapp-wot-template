import type { PluginOption } from "vite";
import UniHelperLayouts from "@uni-helper/vite-plugin-uni-layouts";

export function uniLayouts(): PluginOption {
  return UniHelperLayouts();
}
