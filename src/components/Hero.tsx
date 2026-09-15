import HeroName from "./HeroName";
import WaveField from "./WaveField";
import { site } from "@/data/site";

/*
  间距只用 4/6/10/16/24（16/24/40/64/96px），字号只用 text-label/mega/lead/body/small/meta。
  这是全站统一的模数。
*/
export default function Hero() {
  return (
    <section data-hero className="relative overflow-hidden">
      {/* 实时波形层：呼应作品的声音主题，光标靠近时鼓起 */}
      <WaveField />

      <div
        data-hero-parallax
        className="relative mx-auto max-w-[1120px] px-6 pt-16 pb-24"
      >
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

        <div className="rule-in mt-4 h-px w-full bg-line" />

        {/* 巨型名字：整页视觉主体，逐字响应光标 */}
        <div className="rise rise-1 mt-16">
          <HeroName text={site.name} />
        </div>

        <div className="rule-in mt-16 h-px w-full bg-line" />

        <div className="rise rise-2 mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="text-lead text-fg-2">{site.role}</p>
          {/* 中文没有斜体，用 italic 只会得到难看的合成倾斜 */}
          <p className="text-body text-fg-3">{site.tagline}</p>
        </div>

        <div className="rise rise-3 mt-24 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <p className="max-w-[480px] text-body text-fg-2">{site.intro}</p>

          <ul className="flex flex-wrap gap-2.5">
            {site.links.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="glass pill-hover inline-flex items-center rounded-full px-5 py-2.5 text-small text-fg-2"
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

        {/* 滚动提示：一条会自己缩短再伸长的竖线 */}
        <div className="rise rise-4 mt-24 flex items-center gap-4">
          <span className="font-mono text-meta tracking-normal text-fg-3">
            SCROLL
          </span>
          <span className="scroll-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
