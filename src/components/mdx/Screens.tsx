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
 * 那样会被裁得只剩中间一条。改成定宽横排。
 *
 * 桌面端会被 ScrollEffects 接管：滚到这一屏时钉住，纵向滚动转成横向推进。
 * 屏幕够宽、内容不溢出时自动不钉（见 ScrollEffects 里的 overflow 判断）。
 */
export function Screens({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-screens-pin
      data-lenis-prevent
      // 移动端没有钉住效果，需要保留横滑；桌面端由 ScrollEffects 接管，
      // 必须裁掉溢出的部分，否则被平移的轨道会撑出横向滚动条
      className="full-bleed my-16 overflow-x-auto md:overflow-hidden"
    >
      <div
        data-screens-rail
        className="mx-auto flex w-max gap-6 px-6 will-change-transform"
      >
        {children}
      </div>
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
    <figure className="w-[264px] shrink-0 sm:w-[320px] lg:w-[384px]">
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
