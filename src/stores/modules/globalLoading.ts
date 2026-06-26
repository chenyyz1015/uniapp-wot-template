import type { ToastOptions } from "@wot-ui/ui/components/wd-toast/types";
import { getCurrentPath } from "@/utils";

const defaultOptions: ToastOptions = {
  show: false,
};

export const useGlobalLoadingStore = defineStore("global-loading", () => {
  const loadingOptions = ref<ToastOptions>({ ...defaultOptions });
  const currentPage = ref("");

  const loading = (option: ToastOptions | string) => {
    currentPage.value = getCurrentPath();
    loadingOptions.value = CommonUtil.deepMerge(
      {
        iconName: "loading",
        duration: 0,
        cover: true,
        position: "middle",
        show: true,
      },
      typeof option === "string" ? { msg: option } : option
    ) as ToastOptions;
  };

  const close = () => {
    loadingOptions.value = { ...defaultOptions };
    currentPage.value = "";
  };

  return {
    loadingOptions,
    currentPage,
    loading,
    close,
  };
});
