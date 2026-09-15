import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "有合作意向，或者只是想聊聊，都欢迎。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28">
      <PageHeader
        title="Contact"
        lead="有合作意向，或者只是想聊聊，都欢迎。邮件我一般都会回。"
      />

      <a
        href={`mailto:${site.email}`}
        className="mega-cn block text-display font-medium break-all transition-colors hover:text-accent"
      >
        {site.email}
      </a>

      <ul className="mt-20 flex flex-wrap gap-3">
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
  );
}
