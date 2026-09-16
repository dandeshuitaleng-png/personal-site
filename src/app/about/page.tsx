import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.intro,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-24">
      <PageHeader title="About" />

      <div className="max-w-[680px] space-y-6" data-reveal>
        {site.bio.map((paragraph, i) => (
          <p key={i} className="text-body text-fg-2">
            {paragraph}
          </p>
        ))}
      </div>

      <div
        data-reveal
        data-reveal-stagger="true"
        className="mt-20 grid gap-4 sm:grid-cols-2"
      >
        <div className="glass glass-card rounded-2xl p-7">
          <h2 className="font-mono text-meta text-fg-3 uppercase">
            {site.now.label}
          </h2>
          <p className="mt-4 text-lead text-fg-2">{site.now.text}</p>
        </div>

        <div className="glass glass-card rounded-2xl p-7">
          <h2 className="font-mono text-meta text-fg-3 uppercase">Elsewhere</h2>
          <ul className="mt-4 space-y-3">
            {site.links.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="link text-lead text-fg-2 transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
