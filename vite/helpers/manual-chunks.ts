import type { GetManualChunk } from "rollup";

/** [node_modules 路径片段, chunk 名]；顺序靠前者优先匹配 */
const VENDOR_CHUNKS: ReadonlyArray<readonly [string, string]> = [
  ["@wot-ui/ui", "wot-ui"],
  ["@wot-ui/router", "wot-router"],
  ["@uni-helper/uni-network", "uni-network"],
  ["pinia-plugin-persistedstate", "pinia-persist"],
  ["pinia", "pinia"],
  ["vue-i18n", "vue-i18n"],
];

const VUE_VENDOR_RE = /[/\\]node_modules[/\\](?:vue[/\\]|@vue[/\\])/;

const matchesVendorPkg = (id: string, pkg: string): boolean =>
  pkg.includes("|") ? new RegExp(pkg).test(id) : id.includes(pkg);

export const manualChunks: GetManualChunk = (id) => {
  if (!id.includes("node_modules")) return undefined;

  for (const [pkg, chunkName] of VENDOR_CHUNKS) {
    if (matchesVendorPkg(id, pkg)) return chunkName;
  }

  if (VUE_VENDOR_RE.test(id)) return "vue-vendor";

  return undefined;
};
