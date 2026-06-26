import type { PermissionMatchMode } from "@/utils/permission";
import { matchPermission, matchRole } from "@/utils/permission";

/**
 * 权限 composable（多端统一方案）
 * 模板中使用 v-if="hasPermission('demo:edit')" 或 v-if="hasRole('admin')"
 */
export const usePermission = () => {
  const userStore = useUserStore();

  const hasRole = (role: string | string[], mode: PermissionMatchMode = "some") => {
    const required = Array.isArray(role) ? role : [role];
    return matchRole(userStore.roles, required, mode);
  };

  const hasPermission = (permission: string | string[], mode: PermissionMatchMode = "some") => {
    const required = Array.isArray(permission) ? permission : [permission];
    return matchPermission(userStore.permissions, required, mode);
  };

  return {
    roles: computed(() => userStore.roles),
    permissions: computed(() => userStore.permissions),
    hasRole,
    hasPermission,
  };
};
