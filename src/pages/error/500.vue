<script setup lang="ts">
definePage({
  name: "error500",
  layout: "default",
  meta: {
    titleKey: "router.500",
  },
  style: {
    navigationBarTitleText: "500",
  },
});

const { t } = useLocale();

onShow(() => {
  uni.setNavigationBarTitle({ title: t("router.500") });
});
</script>

<template>
  <view class="min-h-60vh flex flex-col items-center justify-center px-4">
    <text class="text-8 font-bold wot-text-text-main">500</text>
    <text class="mt-2 text-3.5 wot-text-text-secondary">服务器错误</text>
  </view>
</template>
