import { presetUni } from "@uni-helper/unocss-preset-uni";
import { presetWot } from "@wot-ui/unocss-preset";

import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from "unocss";

export default defineConfig({
  presets: [presetUni(), presetWot(), presetIcons()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "flex-between": "flex items-center justify-between",
  },
});
