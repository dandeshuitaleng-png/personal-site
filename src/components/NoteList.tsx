import type { Note } from "@/lib/content";

/**
 * 首页的短文摘要。只列标题和日期，点击跳到 /notes。
 * 短文没有详情页 —— 全部内容在 /notes 页内联渲染。
 */
export default function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) return null;

  return (
    <ul className="border-t border-line">
      {notes.map((note) => (
        <li
          key={note.slug}
          className="flex items-baseline justify-between gap-6 border-b border-line py-6"
        >
          <span className="text-title text-fg-2">{note.title}</span>
          <time
            dateTime={note.date}
            className="shrink-0 font-mono text-meta tracking-normal text-fg-3 tabular-nums"
          >
            {note.date}
          </time>
        </li>
      ))}
    </ul>
  );
}
