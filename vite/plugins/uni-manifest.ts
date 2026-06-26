import type { PluginOption } from "vite";
import UniHelperManifest from "@uni-helper/vite-plugin-uni-manifest";

export function uniManifest(): PluginOption {
  return UniHelperManifest();
}
