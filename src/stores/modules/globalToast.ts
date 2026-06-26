import type { ToastOptions } from "@wot-ui/ui/components/wd-toast/types";
import { getCurrentPath } from "@/utils";

const defaultOptions: ToastOptions = {
  duration: 2000,
  show: false,
};

export const useGlobalToastStore = defineStore("global-toast", () => {
  const toastOptions = ref<ToastOptions>({ ...defaultOptions });
  const currentPage = ref("");

  const show = (option: ToastOptions | string) => {
    currentPage.value = getCurrentPath();
    const options = CommonUtil.deepMerge(
      defaultOptions,
      typeof option === "string" ? { msg: option } : option
    ) as ToastOptions;
    toastOptions.value = CommonUtil.deepMerge(options, {
      show: true,
      position: options.position || "middle",
    }) as ToastOptions;
  };

  const success = (option: ToastOptions | string) => {
    show(
      CommonUtil.deepMerge(
        {
          iconName: "success",
          duration: 1500,
        },
        typeof option === "string" ? { msg: option } : option
      ) as ToastOptions
    );
  };

  const error = (option: ToastOptions | string) => {
    show(
      CommonUtil.deepMerge(
        {
          iconName: "error",
          direction: "vertical",
        },
        typeof option === "string" ? { msg: option } : option
      ) as ToastOptions
    );
  };

  const info = (option: ToastOptions | string) => {
    show(
      CommonUtil.deepMerge(
        {
          iconName: "info",
        },
        typeof option === "string" ? { msg: option } : option
      ) as ToastOptions
    );
  };

  const warning = (option: ToastOptions | string) => {
    show(
      CommonUtil.deepMerge(
        {
          iconName: "warning",
        },
        typeof option === "string" ? { msg: option } : option
      ) as ToastOptions
    );
  };

  const close = () => {
    toastOptions.value = { ...defaultOptions };
    currentPage.value = "";
  };

  return {
    toastOptions,
    currentPage,
    show,
    success,
    error,
    info,
    warning,
    close,
  };
});
