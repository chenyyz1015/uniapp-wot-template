import type { Locale } from "@/i18n/types";
import { LOCALE_OPTIONS } from "@/i18n/constants";
import { setLocale as setLocaleCache } from "@/utils/locale";

export const useLocale = () => {
  const { locale, t } = useI18n();

  const setLocale = (value: Locale) => {
    locale.value = value;
    setLocaleCache(value);
  };

  return {
    locale,
    t,
    localeOptions: LOCALE_OPTIONS,
    setLocale,
  };
};
