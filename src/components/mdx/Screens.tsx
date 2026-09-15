import Image from "next/image";

/**
 * 手机截图横排。在 MDX 里这样用：
 *
 *   <Screens>
 *     <Screen src="/work/xxx/01.png" label="地图探索" />
 *     <Screen src="/work/xxx/02.png" label="语言目录" />
 *   </Screens>
 *
 * 截图是竖长比例（约 1242×2688），不能像普通配图那样全出血 ——
 * 那样会被裁得只剩中间一条。改成定宽横排、可横向滚动。
 */
export function Screens({ children }: { children: React.ReactNode }) {
  return (
    <div
      // data-lenis-prevent：这块自己横滚，不要让平滑滚动接管滚轮
      data-lenis-prevent
      className="full-bleed my-16 overflow-x-auto pb-2"
    >
      <div className="mx-auto flex w-max gap-6 px-6">{children}</div>
    </div>
  );
}

export function Screen({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  return (
    <figure className="w-[248px] shrink-0 sm:w-[272px]">
      <div className="overflow-hidden rounded-2xl border border-line bg-white/3">
        <Image
          src={src}
          alt={label}
          width={620}
          height={1348}
          className="w-full"
        />
      </div>
      <figcaption className="mt-4 font-mono text-meta text-fg-3">
        {label}
      </figcaption>
    </figure>
  );
}
