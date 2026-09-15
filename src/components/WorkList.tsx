import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

/**
 * 作品列表：玻璃卡片。
 * 图片撑满卡片宽度，hover 时卡片浮起 + 边框发光 + 图片微缩放。
 */
export default function WorkList({ items }: { items: Project[] }) {
  if (items.length === 0) {
    return (
      <p className="text-base text-fg-3">
        还没有作品。在 content/work/ 下新建 .mdx 文件就会出现在这里。
      </p>
    );
  }

  return (
    <ul className="grid gap-8 sm:gap-10">
      {items.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/work/${project.slug}`}
            className="glass glass-hover group block overflow-hidden rounded-2xl"
          >
            <div className="relative overflow-hidden">
              <Image
                src={project.cover}
                alt={`${project.title} 封面`}
                width={1600}
                height={1000}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* hover 时从底部压一层暗色，让图片「沉」下去 */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-xl font-medium tracking-tight text-fg sm:text-2xl">
                  {project.title}
                </h3>
                <span className="shrink-0 font-mono text-meta text-fg-3 tabular-nums">
                  {project.year}
                </span>
              </div>

              <p className="mt-3 max-w-[620px] text-base leading-relaxed text-fg-2">
                {project.summary}
              </p>

              {project.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-meta text-fg-3"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
