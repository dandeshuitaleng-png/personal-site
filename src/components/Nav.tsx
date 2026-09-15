import Link from "next/link";
import { site, nav } from "@/data/site";

export default function Nav() {
  return (
    <header className="glass-bar sticky top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <Link
          href="/"
          className="text-small font-medium tracking-tight text-fg transition-opacity hover:opacity-70"
          aria-label={`${site.name} 首页`}
        >
          {site.nameEn}
        </Link>

        <ul className="flex items-center gap-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-4 py-2 text-small text-fg-2 transition-colors hover:bg-white/6 hover:text-fg"
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
