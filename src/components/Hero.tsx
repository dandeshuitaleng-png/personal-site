import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pt-28 pb-24 sm:pt-40 sm:pb-32">
      <h1 className="rise text-display font-medium">{site.name}</h1>

      <p className="rise rise-1 mt-7 text-lg text-ink-2 sm:text-xl">
        {site.role}
      </p>

      <p className="rise rise-2 mt-2 text-base italic text-ink-3">
        {site.tagline}
      </p>

      <p className="rise rise-3 mt-12 max-w-[540px] text-base leading-relaxed text-ink-2">
        {site.intro}
      </p>

      <ul className="rise rise-4 mt-10 flex flex-wrap gap-x-7 gap-y-3">
        {site.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="link text-sm text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
