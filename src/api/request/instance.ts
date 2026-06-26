import un from "@uni-helper/uni-network";
import { DEFAULT_TIMEOUT } from "../constants";

/** Uni Network 实例 */
export const service = un.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default service;
