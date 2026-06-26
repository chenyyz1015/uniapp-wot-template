<script setup lang="ts">
definePage({
  name: "error403",
  layout: "default",
  meta: {
    titleKey: "router.403",
  },
  style: {
    navigationBarTitleText: "403",
  },
});

const { t } = useLocale();

onShow(() => {
  uni.setNavigationBarTitle({ title: t("router.403") });
});
</script>

<template>
  <view class="min-h-60vh flex flex-col items-center justify-center px-4">
    <text class="text-8 font-bold wot-text-text-main">403</text>
    <text class="mt-2 text-3.5 wot-text-text-secondary">没有权限访问该页面</text>
  </view>
</template>
