<script setup lang="ts">
definePage({
  name: "home",
  type: "home",
  layout: "tabbar",
  meta: {
    titleKey: "router.home",
  },
  style: {
    navigationBarTitleText: "首页",
  },
});

const { t } = useLocale();
const userStore = useUserStore();

onShow(() => {
  uni.setNavigationBarTitle({ title: t("router.home") });
});
</script>

<template>
  <view class="box-border px-3 py-4">
    <text class="mb-2 block text-5 font-bold wot-text-text-main">{{ t("home.welcome") }}</text>
    <text class="block text-3.5 wot-text-text-secondary">
      {{ userStore.nickname || userStore.username || "Guest" }}
    </text>
  </view>
</template>
