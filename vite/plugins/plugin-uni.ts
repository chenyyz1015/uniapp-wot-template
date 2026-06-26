import type { PluginOption } from "vite";
import Uni from "@uni-helper/plugin-uni";

export function pluginUni(): PluginOption {
  return Uni();
}
