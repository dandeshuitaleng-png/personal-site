import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

/**
 * 作品列表 —— 排版主导。
 * 编号 + 巨型标题 + 细线，图片退到标题之下作为佐证而非主角。
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
    <ul className="border-t border-line">
      {items.map((project, i) => (
        <li key={project.slug} className="border-b border-line">
          <Link href={`/work/${project.slug}`} className="group block py-12 sm:py-16">
            {/* 编号与年份分列两端，中间留空 */}
            <div className="flex items-baseline justify-between gap-6">
              <span className="font-mono text-meta tracking-normal text-fg-3 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-meta tracking-normal text-fg-3 tabular-nums">
                {project.year}
              </span>
            </div>

            <h3 className="mega-cn mt-5 text-display font-medium transition-colors duration-500 group-hover:text-accent">
              {project.title}
            </h3>

            <p className="mt-5 max-w-[520px] text-base leading-relaxed text-fg-2">
              {project.summary}
            </p>

            {project.tags.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-meta tracking-normal text-fg-3"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {/* 图片：次要角色，hover 时轻微上浮 */}
            <div className="mt-10 overflow-hidden rounded-lg border border-line">
              <Image
                src={project.cover}
                alt={`${project.title} 封面`}
                width={1600}
                height={1000}
                className="aspect-[16/10] w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-100"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
