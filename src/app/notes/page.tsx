import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import PageHeader from "@/components/PageHeader";
import { getAllNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes",
  description: "零碎的想法，都很短。",
};

/**
 * 短文列表。
 *
 * 刻意不做详情页 —— 静态导出不允许「零内容的动态路由」，
 * 而短文本来就只有几句话，全文内联反而是更合适的形式。
 */
export default async function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-24">
      <div className="max-w-[680px]">
        <PageHeader title="Notes" lead="零碎的想法，都很短，不打算写成长文。" />

        {notes.length === 0 ? (
          <p className="text-body text-fg-3">
            还没有短文。这里会放一些零碎的记录，都很短。
          </p>
        ) : (
          <div className="space-y-24">
            {notes.map((note) => (
              <article key={note.slug}>
                <header className="mb-8">
                  <h2 className="mega-cn text-title text-fg">{note.title}</h2>
                  <time
                    dateTime={note.date}
                    className="mt-4 block font-mono text-meta text-fg-3 tabular-nums"
                  >
                    {note.date}
                  </time>
                </header>

                <MDXRemote
                  source={note.body}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
