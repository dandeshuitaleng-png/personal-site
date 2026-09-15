import { site } from "@/data/site";
import LocalTime from "./LocalTime";

export default function Footer() {
  const year = new Date().getFullYear();
  const range = year > site.since ? `${site.since}–${year}` : `${year}`;

  return (
    <footer className="mt-24 border-t border-line px-6 py-12">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-3 font-mono text-meta text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {range} {site.name}
        </span>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>{site.location}</span>
          <LocalTime />
        </span>
      </div>
    </footer>
  );
}
