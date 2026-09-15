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

      <section className="mx-auto max-w-[1120px] px-6 pb-28 sm:pb-36">
        <SectionLabel>Selected Work</SectionLabel>
        <WorkList items={selected} />
        <Link
          href="/work"
          className="glass pill-hover mt-12 inline-flex items-center rounded-full px-5 py-2.5 text-sm text-fg-2"
        >
          全部作品
          <span className="ml-1.5" aria-hidden="true">
            →
          </span>
        </Link>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-32 sm:pb-40">
        <div className="max-w-[680px]">
          <SectionLabel>Notes</SectionLabel>
          <NoteList notes={notes} />
          <Link
            href="/notes"
            className="glass pill-hover mt-8 inline-flex items-center rounded-full px-5 py-2.5 text-sm text-fg-2"
          >
            全部短文
            <span className="ml-1.5" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
