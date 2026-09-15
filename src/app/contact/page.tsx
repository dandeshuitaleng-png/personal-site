import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "有合作意向，或者只是想聊聊，都欢迎。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-28">
      <PageHeader
        title="Contact"
        lead="有合作意向，或者只是想聊聊，都欢迎。邮件我一般都会回。"
      />

      <a
        href={`mailto:${site.email}`}
        className="link text-title font-medium transition-colors hover:text-ink"
      >
        {site.email}
      </a>

      <ul className="mt-20 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
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
    </div>
  );
}
