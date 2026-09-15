import Link from "next/link";
import type { Note } from "@/lib/content";

export default function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <p className="text-base text-fg-3">
        还没有短文。在 content/notes/ 下新建 .mdx 文件就会出现在这里。
      </p>
    );
  }

  return (
    <ul className="grid gap-3">
      {notes.map((note) => (
        <li key={note.slug}>
          <Link
            href={`/notes/${note.slug}`}
            className="glass glass-hover flex items-baseline justify-between gap-6 rounded-xl px-5 py-4"
          >
            <span className="text-base text-fg">{note.title}</span>
            <time
              dateTime={note.date}
              className="shrink-0 font-mono text-meta text-fg-3 tabular-nums"
            >
              {note.date}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
