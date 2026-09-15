import Link from "next/link";
import type { Note } from "@/lib/content";

/** 短文列表：细线分隔 + 较大标题，和作品列表用同一套排版语言 */
export default function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <p className="text-base text-fg-3">
        还没有短文。在 content/notes/ 下新建 .mdx 文件就会出现在这里。
      </p>
    );
  }

  return (
    <ul className="border-t border-line">
      {notes.map((note) => (
        <li key={note.slug} className="border-b border-line">
          <Link
            href={`/notes/${note.slug}`}
            className="group flex items-baseline justify-between gap-6 py-6"
          >
            <span className="text-xl text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
              {note.title}
            </span>
            <time
              dateTime={note.date}
              className="shrink-0 font-mono text-meta tracking-normal text-fg-3 tabular-nums"
            >
              {note.date}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
