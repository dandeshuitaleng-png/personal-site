import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import NoteList from "@/components/NoteList";
import { getAllNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes",
  description: "零碎的想法，都很短。",
};

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-28">
      <div className="max-w-[680px]">
        <PageHeader title="Notes" lead="零碎的想法，都很短，不打算写成长文。" />
        <NoteList notes={getAllNotes()} />
      </div>
    </div>
  );
}
