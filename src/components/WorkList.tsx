import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

/**
 * 作品列表 —— 排版主导 + 图片全出血。
 *
 * 文字块收在容器内（细线分隔，保持阅读栏宽），图片全出血贴到视口边缘。
 * 注意细线**不能**加在 <li> 上 —— 图片是 100vw 而 li 只有容器宽，线会比图短一截。
 */
export default function WorkList({ items }: { items: Project[] }) {
  if (items.length === 0) {
    return (
      <p className="text-body text-fg-3">
        还没有作品。在 content/work/ 下新建 .mdx 文件就会出现在这里。
      </p>
    );
  }

  return (
    <ul>
      {items.map((project, i) => (
        <li key={project.slug} className="pb-24">
          <div className="border-t border-line pt-16">
            <Link href={`/work/${project.slug}`} className="group block">
              <div className="flex items-baseline justify-between gap-6">
                <span className="font-mono text-meta tracking-normal text-fg-3 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-meta tracking-normal text-fg-3 tabular-nums">
                  {project.year}
                </span>
              </div>

              <h3 className="mega-cn mt-6 text-display font-light">
                {project.title}
              </h3>

              <p className="mt-4 max-w-[480px] text-body text-fg-2">
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
            </Link>
          </div>

          <div className="full-bleed mt-16 overflow-hidden">
            <Link
              href={`/work/${project.slug}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={project.cover}
                alt=""
                width={1600}
                height={1000}
                className="max-h-[70vh] w-full object-cover opacity-80 transition-all duration-700 ease-out hover:scale-[1.015] hover:opacity-100"
              />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
