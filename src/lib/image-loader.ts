import { BASE_PATH } from "./base-path";

/**
 * next/image 的自定义 loader。
 *
 * 做两件事：
 *
 * 1. 补 basePath。
 *    next/image 在 images.unoptimized = true 时用「直通 loader」，
 *    把 src 原样返回、不补前缀，线上图片会 404。
 *
 * 2. 给 public/ 下的图片加构建版本号。
 *    public/ 里的文件**文件名不变**，浏览器会按 max-age 长期缓存 ——
 *    换了一张图，访客（包括你自己验收时）看到的还是旧图。
 *    加上按 commit 生成的版本号后，每次部署 URL 都变，缓存自然失效。
 *    代价是每次部署图片会重新下载一次（本站图片总量约 400 KB）。
 */
const VERSION = process.env.NEXT_PUBLIC_BUILD_ID;

export default function imageLoader({ src }: { src: string }) {
  // 外链和 data URI 原样返回
  if (/^https?:\/\//.test(src) || src.startsWith("data:")) {
    return src;
  }

  const path = `${BASE_PATH}${src}`;
  return VERSION ? `${path}?v=${VERSION}` : path;
}
