import type { ThemeMode } from "@/stores/types/theme";
import { buildSystemThemeVars } from "@/stores/types/theme";

/**
 * 简化版系统主题状态管理
 * 仅支持跟随系统主题，不提供手动切换功能
 * 导航栏颜色通过 theme.json 自动处理
 */
export const useThemeStore = defineStore("theme", () => {
  const theme = ref<ThemeMode>("light");
  const themeVars = buildSystemThemeVars();

  const isDark = computed(() => theme.value === "dark");

  /** 获取系统主题 */
  const getSystemTheme = (): ThemeMode => {
    // #ifdef MP-WEIXIN
    const appBaseInfo = uni.getAppBaseInfo();
    if (appBaseInfo && appBaseInfo.theme) {
      return appBaseInfo.theme as ThemeMode;
    }
    // #endif

    // #ifndef MP-WEIXIN
    const systemInfo = uni.getSystemInfoSync();
    if (systemInfo && systemInfo.theme) {
      return systemInfo.theme as ThemeMode;
    }
    // #endif

    return "light";
  };

  /** 设置主题（仅内部使用） */
  const setTheme = (mode: ThemeMode) => {
    theme.value = mode;
  };

  /** 初始化系统主题 */
  const initSystemTheme = () => {
    theme.value = getSystemTheme();
  };

  return {
    theme,
    themeVars,
    isDark,
    getSystemTheme,
    setTheme,
    initSystemTheme,
  };
});
