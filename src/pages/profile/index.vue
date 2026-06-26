<script setup lang="ts">
definePage({
  name: "profile",
  layout: "tabbar",
  meta: {
    titleKey: "router.profile",
  },
  style: {
    navigationBarTitleText: "我的",
  },
});

const { t } = useLocale();
const userStore = useUserStore();
const router = useRouter();
const { hasRole } = usePermission();

async function handleLogout() {
  await userStore.logout();
  router.replace({ path: "/pages/auth/login" });
}

onShow(() => {
  uni.setNavigationBarTitle({ title: t("router.profile") });
});
</script>

<template>
  <view class="box-border px-3 py-4">
    <view class="mb-3 overflow-hidden rounded-2">
      <wd-cell-group border>
        <wd-cell :title="t('auth.username')" :value="userStore.username || '-'" />
        <wd-cell :title="t('auth.logout')" is-link @click="handleLogout" />
      </wd-cell-group>
    </view>

    <wd-button v-if="hasRole('admin')" type="primary" block>管理员可见</wd-button>
  </view>
</template>
