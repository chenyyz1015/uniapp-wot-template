import type { PluginOption } from "vite";
import { pluginUni } from "./plugin-uni";
import { uniComponents } from "./uni-components";
import { uniKuRoot } from "./uni-ku-root";
import { uniLayouts } from "./uni-layouts";
import { uniManifest } from "./uni-manifest";
import { uniPages } from "./uni-pages";
import { uniPlatform } from "./uni-platform";
import { unocss } from "./unocss";
import { unpluginAutoImport } from "./unplugin-auto-import";

export const plugins: PluginOption[] = [
  uniPlatform(),
  uniManifest(),
  uniPages(),
  uniLayouts(),
  uniComponents(),
  uniKuRoot(),
  pluginUni(),
  unpluginAutoImport(),
  unocss(),
];
