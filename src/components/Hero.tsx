import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1120px] px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
      {/* 顶部标签行：英文名用宽字距拉成一条「标尺」 */}
      <div className="rise flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-label tracking-wider-x text-fg-3 uppercase">
          {site.nameEn}
        </span>

        <span className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fg" />
          </span>
          <span className="font-mono text-meta tracking-normal text-fg-2">
            {site.now.text}
          </span>
        </span>
      </div>

      <div className="rule-in mt-5 h-px w-full bg-line" />

      {/* 巨型名字：整页视觉主体。
          font-light 是关键 —— 轻字重在极端尺度下才有建筑感，粗体只会显得笨重。 */}
      <h1 className="mega-cn rise rise-1 mt-9 text-mega font-light">
        {site.name}
      </h1>

      <div className="rule-in mt-9 h-px w-full bg-line" />

      <div className="rise rise-2 mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="text-lg text-fg-2 sm:text-xl">{site.role}</p>
        <p className="text-base text-fg-3 italic">{site.tagline}</p>
      </div>

      <div className="rise rise-3 mt-20 grid gap-10 sm:mt-24 sm:grid-cols-[1fr_auto] sm:items-end">
        <p className="max-w-[500px] text-base leading-relaxed text-fg-2">
          {site.intro}
        </p>

        <ul className="flex flex-wrap gap-3">
          {site.links.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="glass pill-hover inline-flex items-center rounded-full px-5 py-2.5 text-sm text-fg-2"
                >
                  {link.label}
                  {external && (
                    <span className="ml-1.5 text-fg-3" aria-hidden="true">
                      ↗
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
