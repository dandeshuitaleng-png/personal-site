import Link from "next/link";
import { site, nav } from "@/data/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
        <Link
          href="/"
          className="link text-sm font-medium tracking-tight"
          aria-label={`${site.name} 首页`}
        >
          {site.nameEn}
        </Link>

        <ul className="flex items-center gap-6 sm:gap-8">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="link text-sm text-ink-2 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
