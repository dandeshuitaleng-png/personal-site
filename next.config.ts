import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/base-path";

/**
 * 部署目标：https://dandeshuitaleng-png.github.io/personal-site/
 *
 * GitHub Pages 的项目站把资源挂在子路径下，所以必须配 basePath，
 * 否则 CSS、JS、图片在线上全部 404。
 *
 * basePath 会自动作用于 next/link 和构建产物，
 * 但**不会**自动作用于图片 —— 见 src/lib/image-loader.ts 里的说明。
 *
 * 副作用：本地预览地址也带前缀 —— http://localhost:3000/personal-site/
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,

  images: {
    // 自定义 loader 接管图片路径拼接（补 basePath）。
    // 静态导出没有服务端，本来也不需要运行时优化。
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
