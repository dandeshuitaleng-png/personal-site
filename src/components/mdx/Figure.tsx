import Image from "next/image";

/**
 * 详情页配图。在 MDX 里这样用：
 *
 *   <Figure src="/work/xxx.png" alt="说明" caption="图注（可选）" />
 *
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
    <figure className="my-14">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        className="w-full rounded-sm border border-line bg-paper-2"
      />
      {caption && (
        <figcaption className="mt-3 max-w-[680px] font-mono text-meta text-ink-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
