<script setup lang="ts">
definePage({
  name: "error404",
  layout: "default",
  meta: {
    titleKey: "router.404",
  },
  style: {
    navigationBarTitleText: "404",
  },
});

const { t } = useLocale();

onShow(() => {
  uni.setNavigationBarTitle({ title: t("router.404") });
});
</script>

<template>
  <view class="min-h-60vh flex flex-col items-center justify-center px-4">
    <text class="text-8 font-bold wot-text-text-main">404</text>
    <text class="mt-2 text-3.5 wot-text-text-secondary">页面不存在</text>
  </view>
</template>
