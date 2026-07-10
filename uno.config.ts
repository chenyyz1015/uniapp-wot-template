import { presetUni } from "@uni-helper/unocss-preset-uni";
import presetLegacyCompat from "@unocss/preset-legacy-compat";
import { presetWot } from "@wot-ui/unocss-preset";
import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from "unocss";
import { getPresetIconsConfig } from "./scripts/unocss-preset-icons";

const { safelist, collections } = getPresetIconsConfig();

export default defineConfig({
  presets: [
    presetUni({ attributify: false }),
    presetIcons({
      scale: 1.2,
      warn: true,
      // 设置图标的默认 CSS 属性
      extraProperties: {
        display: "inline-block",
        width: "1em",
        height: "1em",
      },
      collections,
    }),
    presetWot(),
    presetLegacyCompat({
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // 注册本地图标类名
  safelist,
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "flex-between": "flex items-center justify-between",
  },
});
