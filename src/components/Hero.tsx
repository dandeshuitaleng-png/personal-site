import Image from "next/image";
import HeroName from "./HeroName";
import WaveField from "./WaveField";
import { site } from "@/data/site";
import { getAllProjects } from "@/lib/content";

/*
  首屏构图：左文右图。

  之前是「巨型名字 + 一片黑」，首屏 90% 是空的 —— 那读起来不是极简，
  是没做完。作品的颜色（暖白 + 黛青）应该在第一屏就出现，
  让暗色背景有可以对比的对象。
*/
export default function Hero() {
  const [lead] = getAllProjects();

  return (
    <section data-hero className="relative overflow-hidden">
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

        {/* 左文右图：文字和作品在同一屏 */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <div className="rise rise-1">
              <HeroName text={site.name} />
            </div>

            <div className="rise rise-2 mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <p className="text-lead text-fg-2">{site.role}</p>
              <p className="text-body text-fg-3">{site.tagline}</p>
            </div>

            <p className="rise rise-3 mt-10 max-w-[440px] text-body text-fg-2">
              {site.intro}
            </p>

            <ul className="rise rise-4 mt-10 flex flex-wrap gap-2.5">
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

          {/* 作品实拍：首屏就要有视觉锚点 */}
          {lead && (
            <figure className="rise rise-2 mx-auto w-full max-w-[300px] lg:mx-0 lg:w-[290px]">
              <div className="overflow-hidden rounded-[28px] border border-line-2 bg-white/3 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
                <Image
                  src="/work/xiangyin/01-map-explore.webp"
                  alt="乡音地图 · 3D 地形方言地图"
                  width={620}
                  height={1348}
                  priority
                  className="w-full"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                <span className="font-mono text-meta tracking-normal text-fg-2">
                  {lead.title}
                </span>
                <span className="font-mono text-meta tracking-normal text-fg-3 tabular-nums">
                  {lead.year}
                </span>
              </figcaption>
            </figure>
          )}
        </div>

        <div className="rule-in mt-20 h-px w-full bg-line" />

        <div className="rise rise-4 mt-6 flex items-center gap-4">
          <span className="font-mono text-meta tracking-normal text-fg-3">
            SCROLL
          </span>
          <span className="scroll-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
