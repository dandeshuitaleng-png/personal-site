import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.intro,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28">
      <PageHeader title="About" />

      <div className="max-w-[680px] space-y-6">
        {site.bio.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-fg-2">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="glass mt-20 max-w-[680px] rounded-2xl p-7 sm:p-8">
        <h2 className="font-mono text-meta text-fg-3 uppercase">
          {site.now.label}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-fg-2">
          {site.now.text}
        </p>
      </div>
    </div>
  );
}
