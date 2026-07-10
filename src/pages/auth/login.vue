<script setup lang="ts">
definePage({
  name: "login",
  layout: "default",
  meta: {
    titleKey: "router.login",
  },
  style: {
    navigationBarTitleText: "登录",
  },
});

const { t } = useLocale();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

const username = ref("admin");
const password = ref("123456");
const loading = ref(false);

async function handleLogin() {
  if (!username.value || !password.value) {
    toast.warning("请输入账号和密码");
    return;
  }

  loading.value = true;
  try {
    await userStore.login({ username: username.value, password: password.value });
    await userStore.getInfo();
    toast.success(t("auth.loginSuccess"));

    const redirect = (route.query?.redirect as string) || "/pages/home/index";
    router.pushTab({ path: redirect });
  } catch {
    // 错误已由请求层提示
  } finally {
    loading.value = false;
  }
}

function goRegister() {
  router.push({ path: "/pages/auth/register" });
}

onShow(() => {
  uni.setNavigationBarTitle({ title: t("router.login") });
});
</script>

<template>
  <view class="box-border px-4 py-6">
    <view class="mb-6">
      <!-- 保留颜色 -->
      <text class="i-preserve-color:vite"></text>
      <!-- 可着色 -->
      <text class="i-svg:home text-amber"></text>
      <text class="block text-6 font-bold wot-text-text-main">{{ t("router.login") }}</text>
    </view>

    <wd-input v-model="username" :label="t('auth.username')" clearable />
    <wd-input v-model="password" :label="t('auth.password')" show-password clearable custom-class="mt-3" />

    <wd-button type="primary" block custom-class="mt-6" :loading="loading" @click="handleLogin">
      {{ t("auth.login") }}
    </wd-button>

    <wd-button plain block custom-class="mt-3" @click="goRegister">
      {{ t("auth.register") }}
    </wd-button>
  </view>
</template>
