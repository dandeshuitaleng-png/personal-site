import Link from "next/link";
import type { Note } from "@/lib/content";

export default function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <p className="text-base text-ink-3">
        还没有短文。在 content/notes/ 下新建 .mdx 文件就会出现在这里。
      </p>
    );
  }

  return (
    <ul className="border-y border-line">
      {notes.map((note) => (
        <li key={note.slug} className="border-b border-line last:border-b-0">
          <Link
            href={`/notes/${note.slug}`}
            className="group flex items-baseline justify-between gap-6 py-5"
          >
            <span className="link text-base text-ink">{note.title}</span>
            <time
              dateTime={note.date}
              className="shrink-0 font-mono text-meta text-ink-3 tabular-nums"
            >
              {note.date}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
