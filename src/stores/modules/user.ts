import type { LoginParams, LoginPhoneParams, UserInfoResult } from "@/api/types/auth";
import * as authApi from "@/api/modules/auth";
import { getToken, removeToken, setToken } from "@/utils/auth";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const userInfo = ref<UserInfoResult>({
    id: "",
    username: "",
    nickname: "",
    avatar: "",
    email: "",
    phone: "",
    roles: [],
    permissions: [],
  });

  const isLoggedIn = computed(() => !!token.value);
  const userId = computed(() => userInfo.value.id);
  const username = computed(() => userInfo.value.username);
  const nickname = computed(() => userInfo.value.nickname);
  const avatar = computed(() => userInfo.value.avatar);
  const email = computed(() => userInfo.value.email);
  const phone = computed(() => userInfo.value.phone);
  const roles = computed(() => userInfo.value.roles ?? []);
  const permissions = computed(() => userInfo.value.permissions ?? []);

  /** 登录 */
  const login = async (params: LoginParams | LoginPhoneParams) => {
    const result = await authApi.login(params);
    token.value = result.data.token;
    setToken(result.data.token);
  };

  /** 获取用户信息 */
  const getInfo = async () => {
    const result = await authApi.getInfo();
    userInfo.value = result.data;
  };

  /** 登出 */
  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // 即使接口失败也要清除本地状态
    }
    token.value = "";
    userInfo.value = {
      id: "",
      username: "",
      nickname: "",
      avatar: "",
      email: "",
      phone: "",
      roles: [],
      permissions: [],
    };
    removeToken();
  };

  return {
    userId,
    username,
    nickname,
    avatar,
    email,
    phone,
    token,
    userInfo,
    isLoggedIn,
    roles,
    permissions,
    login,
    getInfo,
    logout,
  };
});
