import { defineConfig } from "@uni-helper/unh";

export default defineConfig({
  // 平台别名配置
  platform: {
    // 设置默认平台
    default: "h5",
    // 配置平台别名
    alias: {
      "mp-weixin": "wx",
      "mp-alipay": ["ali", "alipay"],
    },
  },
  // 准备阶段配置，可以自定义hooks
  hooks: {
    // 安装依赖时的hooks
    prepare() {
      console.log("prepare");
    },
    // 开发前的hooks，接收平台参数
    dev({ platform, options, envData }) {
      console.log("dev:", platform, options, envData);
    },
    // 构建前的hooks，接收平台参数
    build({ platform, options, envData }) {
      console.log("build:", platform, options, envData);
    },
    // 构建后的hooks，接收平台参数
    onBuildAfter({ platform, options, envData }) {
      console.log("buildAfter:", platform, options, envData);
    },
  },
  // 自动生成配置
  autoGenerate: {
    // 输出目录，默认为 'src'
    outDir: "src",
    // 是否自动生成 pages.json
    pages: true,
    // 是否自动生成 manifest.json
    manifest: true,
  },
  // 小程序开发者工具配置
  devtools: {
    // 是否自动打开小程序开发者工具
    open: true,
  },
  // 环境变量配置
  env: {
    // 环境变量文件根目录
    root: "envs",
    // 使用平台名称当作子目录
    usePlatformDir: true,
    // 自定义环境变量前缀
    prefixes: ["VITE_", "UNI_"],
    // 将加载的环境变量合并至 process.env 中
    intoProcess: true,
    // 生成类型声明文件
    dts: "types/env.d.ts",
  },
});
