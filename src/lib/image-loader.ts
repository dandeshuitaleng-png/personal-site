import { BASE_PATH } from "./base-path";

/**
 * next/image 的自定义 loader。
 *
 * 为什么需要它：
 *   next/image 在 images.unoptimized = true 时会使用「直通 loader」——
 *   直接把 src 原样返回，不会补 basePath。结果就是线上图片 404。
 *   用自定义 loader 就能接管这个拼接过程。
 *
 * 静态导出下我们不需要真正的图片优化（没有服务端），
 * 所以这里只做一件事：给站内资源补上 basePath 前缀。
 */
export default function imageLoader({ src }: { src: string }) {
  // 外链和 data URI 原样返回
  if (/^https?:\/\//.test(src) || src.startsWith("data:")) {
    return src;
  }

  // public/ 下的站内资源补前缀
  return `${BASE_PATH}${src}`;
}
