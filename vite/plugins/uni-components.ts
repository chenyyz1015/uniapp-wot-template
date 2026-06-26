import type { PluginOption } from "vite";
import UniHelperComponents from "@uni-helper/vite-plugin-uni-components";
import { WotResolver } from "../resolvers/wot-ui";

export function uniComponents(): PluginOption {
  return UniHelperComponents({
    resolvers: [WotResolver()],
    dts: "types/components.d.ts",
    dirs: ["src/components"],
    directoryAsNamespace: true,
  });
}
