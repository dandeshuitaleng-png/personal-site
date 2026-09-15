import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import { getAllProjects, getProject } from "@/lib/content";

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

  const links = [
    project.href && { label: "在线预览", href: project.href, external: true },
    project.repo && { label: "源码", href: project.repo, external: true },
  ].filter(Boolean) as {
    label: string;
    href: string;
    external: boolean;
  }[];

  return (
    <article className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28">
      <Link
        href="/work"
        className="link font-mono text-meta text-fg-3 transition-colors hover:text-fg"
      >
        ← 返回 Work
      </Link>

      <header className="rise mt-12 mb-4">
        <h1 className="mega-cn text-display font-light">{project.title}</h1>
        <p className="mt-8 max-w-[560px] text-lg leading-relaxed text-fg-2">
          {project.summary}
        </p>

        {links.length > 0 && (
          <div className="mt-9 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="glass pill-hover inline-flex items-center rounded-full px-5 py-2.5 text-sm text-fg-2"
              >
                {link.label}
                {link.external && (
                  <span className="ml-1.5 text-fg-3" aria-hidden="true">
                    ↗
                  </span>
                )}
              </a>
            ))}
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
          className="link text-sm text-fg-2 transition-colors hover:text-fg"
        >
          ← 返回全部作品
        </Link>
      </nav>
    </article>
  );
}
