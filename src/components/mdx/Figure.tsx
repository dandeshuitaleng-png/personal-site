import Image from "next/image";

/**
 * 详情页配图。在 MDX 里这样用：
 *
 *   <Figure src="/work/xxx.png" alt="说明" caption="图注（可选）" />
 *
 * 图片全出血贴到视口边缘，图注仍收在正文栏宽内。
 * 路径写 public/ 下的绝对路径（如 /work/xxx.png），
 * next/image 会自动补上 basePath 前缀。
 */
export default function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="full-bleed my-16">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        className="max-h-[75vh] w-full object-cover"
      />
      {caption && (
        <figcaption className="mx-auto mt-4 max-w-[680px] px-6 font-mono text-meta text-fg-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
