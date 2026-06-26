import type { PluginOption } from "vite";
import AutoImport from "unplugin-auto-import/vite";

export function unpluginAutoImport(): PluginOption {
  return AutoImport({
    imports: [
      "vue",
      "pinia",
      "uni-app",
      "vue-i18n",
      {
        from: "@wot-ui/router",
        imports: ["createRouter", "useRouter", "useRoute"],
      },
      {
        from: "@wot-ui/ui",
        imports: ["useToast", "useDialog", "useNotify", "CommonUtil"],
      },
    ],
    dts: "types/auto-imports.d.ts",
    dirs: ["src/composables", "src/stores/modules"],
    vueTemplate: true,
    eslintrc: {
      enabled: true,
      filepath: "./.eslintrc-auto-import.json",
    },
  });
}
