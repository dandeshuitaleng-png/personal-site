import Link from "next/link";
import Hero from "@/components/Hero";
import WorkList from "@/components/WorkList";
import NoteList from "@/components/NoteList";
import SectionLabel from "@/components/SectionLabel";
import { getAllNotes, getAllProjects } from "@/lib/content";

export default function Home() {
  const projects = getAllProjects();
  const notes = getAllNotes();

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-[1120px] px-6 pb-24">
        <SectionLabel>Selected Work</SectionLabel>
        <WorkList items={projects} />
        {projects.length > 2 && (
          <Link
            href="/work"
            className="glass pill-hover mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-small text-fg-2"
          >
            全部作品
            <span className="ml-1.5" aria-hidden="true">
              →
            </span>
          </Link>
        )}
      </section>

      {/* 没有短文时不渲染这一整块，避免首页出现空板块 */}
      {notes.length > 0 && (
        <section className="mx-auto max-w-[1120px] px-6 pb-24">
          <div className="max-w-[680px]">
            <SectionLabel>Notes</SectionLabel>
            <NoteList notes={notes} />
            <Link
              href="/notes"
              className="glass pill-hover mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-small text-fg-2"
            >
              全部短文
              <span className="ml-1.5" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
