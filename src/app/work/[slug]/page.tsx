import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import { getAllProjects, getProject } from "@/lib/content";

/** 静态导出必须显式列出所有要生成的路径 */
export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-[1100px] px-6 py-20 sm:py-28">
      <Link
        href="/work"
        className="link font-mono text-meta text-ink-3 transition-colors hover:text-ink"
      >
        ← 返回 Work
      </Link>

      <header className="rise mt-12 mb-4">
        <h1 className="text-display font-medium">{project.title}</h1>
        <p className="mt-7 max-w-[560px] text-lg leading-relaxed text-ink-2">
          {project.summary}
        </p>

        {(project.href || project.repo) && (
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="link text-sm text-ink-2 transition-colors hover:text-ink"
              >
                在线预览 ↗
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="link text-sm text-ink-2 transition-colors hover:text-ink"
              >
                源码 ↗
              </a>
            )}
          </div>
        )}
      </header>

      <MDXRemote
        source={project.body}
        components={mdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />

      <nav className="mt-24 border-t border-line pt-8">
        <Link
          href="/work"
          className="link text-sm text-ink-2 transition-colors hover:text-ink"
        >
          ← 返回全部作品
        </Link>
      </nav>
    </article>
  );
}
