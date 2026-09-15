import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1120px] px-6 pt-24 pb-24 sm:pt-36 sm:pb-32">
      {/* 状态胶囊：让首屏有「活人感」，也是 Paco 那一路的细节 */}
      <div className="rise glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
        </span>
        <span className="font-mono text-meta text-fg-2">{site.now.text}</span>
      </div>

      <h1 className="rise rise-1 grad-text mt-9 text-display font-medium">
        {site.name}
      </h1>

      <p className="rise rise-2 mt-7 text-xl text-fg-2 sm:text-2xl">
        {site.role}
      </p>

      <p className="rise rise-2 mt-2 text-base italic text-fg-3">
        {site.tagline}
      </p>

      <p className="rise rise-3 mt-12 max-w-[560px] text-base leading-relaxed text-fg-2">
        {site.intro}
      </p>

      <ul className="rise rise-4 mt-10 flex flex-wrap gap-3">
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
    </section>
  );
}
