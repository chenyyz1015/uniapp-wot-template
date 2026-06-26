import type { ThemeColorOption, ThemeMode } from "@/stores/types/theme.d";
import { buildThemeVars, themeColorOptions } from "@/stores/types/theme.d";

/**
 * 完整版主题状态管理
 * 支持手动切换主题、主题色选择、跟随系统主题等完整功能
 */
export const useManualThemeStore = defineStore("manualTheme", () => {
  const theme = ref<ThemeMode>("light");
  const followSystem = ref(true);
  const hasUserSet = ref(false);
  const currentThemeColor = ref<ThemeColorOption>(themeColorOptions[0]);
  const themeVars = ref(buildThemeVars(themeColorOptions[0]));

  const isDark = computed(() => theme.value === "dark");

  /** 设置导航栏颜色 */
  const setNavigationBarColor = () => {
    uni.setNavigationBarColor({
      frontColor: theme.value === "light" ? "#000000" : "#ffffff",
      backgroundColor: theme.value === "light" ? "#ffffff" : "#000000",
    });
  };

  /** 获取系统主题 */
  const getSystemTheme = (): ThemeMode => {
    try {
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
    } catch (error) {
      console.warn("获取系统主题失败:", error);
    }
    return "light";
  };

  /** 初始化主题 */
  const initTheme = () => {
    if (hasUserSet.value && !followSystem.value) {
      setNavigationBarColor();
      return;
    }

    const systemTheme = getSystemTheme();

    if (!hasUserSet.value || followSystem.value) {
      theme.value = systemTheme;
      if (!hasUserSet.value) {
        followSystem.value = true;
      }
    }

    setNavigationBarColor();
  };

  /** 手动切换主题 */
  const toggleTheme = (mode?: ThemeMode, isFollw: boolean = false) => {
    theme.value = mode || (theme.value === "light" ? "dark" : "light");
    if (!isFollw) {
      hasUserSet.value = true;
      followSystem.value = false;
    }
    setNavigationBarColor();
  };

  /** 设置是否跟随系统主题 */
  const setFollowSystem = (follow: boolean) => {
    followSystem.value = follow;
    if (follow) {
      hasUserSet.value = false;
      initTheme();
    }
  };

  /** 设置主题色 */
  const setCurrentThemeColor = (color: ThemeColorOption) => {
    currentThemeColor.value = color;
    themeVars.value = {
      ...themeVars.value,
      ...buildThemeVars(color),
    };
  };

  return {
    theme,
    followSystem,
    hasUserSet,
    currentThemeColor,
    themeVars,
    isDark,
    toggleTheme,
    setFollowSystem,
    setNavigationBarColor,
    setCurrentThemeColor,
    getSystemTheme,
    initTheme,
  };
});
