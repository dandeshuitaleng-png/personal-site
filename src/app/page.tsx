import Link from "next/link";
import Hero from "@/components/Hero";
import WorkList from "@/components/WorkList";
import NoteList from "@/components/NoteList";
import SectionLabel from "@/components/SectionLabel";
import { getAllNotes, getAllProjects } from "@/lib/content";

export default function Home() {
  const selected = getAllProjects().slice(0, 3);
  const notes = getAllNotes().slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-[1100px] px-6 pb-28 sm:pb-36">
        <SectionLabel>Selected Work</SectionLabel>
        <WorkList items={selected} />
        <Link
          href="/work"
          className="link mt-14 inline-block text-sm text-ink-2 transition-colors hover:text-ink"
        >
          全部作品 →
        </Link>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-32 sm:pb-40">
        <div className="max-w-[680px]">
          <SectionLabel>Notes</SectionLabel>
          <NoteList notes={notes} />
          <Link
            href="/notes"
            className="link mt-10 inline-block text-sm text-ink-2 transition-colors hover:text-ink"
          >
            全部短文 →
          </Link>
        </div>
      </section>
    </>
  );
}
