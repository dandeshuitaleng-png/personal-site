import Link from "next/link";
import type { Note } from "@/lib/content";

/** 短文列表：细线分隔 + 与作品列表同一套模数 */
export default function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <p className="text-body text-fg-3">
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
            <span className="text-title text-fg-2 transition-colors duration-300 group-hover:text-fg">
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
