import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "有合作意向，或者只是想聊聊，都欢迎。",
};

export default function ContactPage() {
  const channels = [
    {
      label: "邮箱",
      value: site.email,
      href: `mailto:${site.email}`,
      note: "最直接的方式，我一般都会回。",
    },
    ...site.links
      .filter((l) => !l.href.startsWith("mailto:"))
      .map((l) => ({
        label: l.label,
        value: l.href.replace(/^https?:\/\//, ""),
        href: l.href,
        note: "",
      })),
  ];

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-24">
      <PageHeader
        title="Contact"
        lead="有合作意向，或者只是想聊聊，都欢迎。"
      />

      <ul
        data-reveal
        data-reveal-stagger="true"
        className="grid gap-4 sm:grid-cols-2"
      >
        {channels.map((c) => {
          const external = c.href.startsWith("http");
          return (
            <li key={c.href}>
              <a
                href={c.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="glass glass-card group flex h-full flex-col rounded-2xl p-7"
              >
                <span className="font-mono text-meta tracking-normal text-fg-3 uppercase">
                  {c.label}
                </span>
                <span className="mt-4 text-lead text-fg break-all transition-colors">
                  {c.value}
                </span>
                {c.note && (
                  <span className="mt-3 text-small text-fg-3">{c.note}</span>
                )}
                {external && (
                  <span
                    className="mt-4 text-small text-fg-3 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
