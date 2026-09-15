import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

/**
 * 作品列表 —— Samuel Kraft 那种图-led 的做法：
 * 大图在前，标题 + 年份一行，下面一句话描述。
 */
export default function WorkList({ items }: { items: Project[] }) {
  if (items.length === 0) {
    return (
      <p className="text-base text-ink-3">
        还没有作品。在 content/work/ 下新建 .mdx 文件就会出现在这里。
      </p>
    );
  }

  return (
    <ul className="space-y-24 sm:space-y-32">
      {items.map((project) => (
        <li key={project.slug}>
          <Link href={`/work/${project.slug}`} className="group block">
            <div className="overflow-hidden rounded-sm border border-line bg-paper-2">
              {/* 用 next/image 而不是原生 img：只有它会自动处理 basePath */}
              <Image
                src={project.cover}
                alt={`${project.title} 封面`}
                width={1600}
                height={1000}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>

            <div className="mt-6 flex items-baseline justify-between gap-6">
              <h3 className="text-title font-medium">
                <span className="link">{project.title}</span>
              </h3>
              <span className="shrink-0 font-mono text-meta text-ink-3 tabular-nums">
                {project.year}
              </span>
            </div>

            <p className="mt-3 max-w-[560px] text-base leading-relaxed text-ink-2">
              {project.summary}
            </p>

            {project.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="font-mono text-meta text-ink-3">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
