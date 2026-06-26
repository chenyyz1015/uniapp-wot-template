<script setup lang="ts">
definePage({
  name: "register",
  layout: "default",
  meta: {
    titleKey: "router.register",
  },
  style: {
    navigationBarTitleText: "注册",
  },
});

const { t } = useLocale();
const router = useRouter();

function goLogin() {
  router.replace({ path: "/pages/auth/login" });
}

onShow(() => {
  uni.setNavigationBarTitle({ title: t("router.register") });
});
</script>

<template>
  <view class="box-border px-4 py-6">
    <text class="mb-4 block text-5 font-bold wot-text-text-main">{{ t("router.register") }}</text>
    <text class="mb-6 block text-3.5 wot-text-text-secondary">注册页占位，接入业务 API 后完善表单。</text>
    <wd-button type="primary" block @click="goLogin">{{ t("auth.login") }}</wd-button>
  </view>
</template>
