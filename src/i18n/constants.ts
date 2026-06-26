import type { Locale } from "./types";

export const DEFAULT_LOCALE: Locale = "zh-CN";

export const FALLBACK_LOCALE: Locale = "en-US";

export const LOCALE_OPTIONS = [
  { label: "简体中文", value: "zh-CN" as Locale },
  { label: "English", value: "en-US" as Locale },
];
