import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import { getAllNotes, getNote } from "@/lib/content";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.body.replace(/[#*>!\[\]()\-]/g, "").slice(0, 80).trim(),
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) notFound();

  return (
    <article className="mx-auto max-w-[1120px] px-6 py-24">
      <div className="max-w-[680px]">
        <Link
          href="/notes"
          className="link font-mono text-meta tracking-normal text-fg-3 transition-colors hover:text-fg"
        >
          ← 返回 Notes
        </Link>

        <header className="rise mt-16 mb-16">
          <h1 className="mega-cn text-display font-light">{note.title}</h1>
          <time
            dateTime={note.date}
            className="mt-6 block font-mono text-meta text-fg-3 tabular-nums"
          >
            {note.date}
          </time>
        </header>

        <MDXRemote
          source={note.body}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
