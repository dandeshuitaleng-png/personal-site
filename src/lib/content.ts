import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * 内容层：从 content/ 目录读取 .mdx 文件。
 *
 * 全部在构建时执行（静态导出），不会进客户端 bundle。
 * 加一篇短文 = 在 content/notes/ 下新建一个 .mdx 文件，不需要改代码。
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Note = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** MDX 正文 */
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role?: string;
  team?: string;
  tags: string[];
  cover: string;
  href?: string;
  repo?: string;
  /** 排序用，数字小的在前 */
  order: number;
  body: string;
};

type Kind = "notes" | "work";

function dirOf(kind: Kind) {
  return path.join(CONTENT_DIR, kind);
}

function listSlugs(kind: Kind): string[] {
  const dir = dirOf(kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readOne(kind: Kind, slug: string) {
  const file = path.join(dirOf(kind), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { data, content };
}

/** YAML 会把不加引号的日期解析成 Date，统一成 YYYY-MM-DD 字符串 */
function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

/* ---------------- Notes ---------------- */

export function getNote(slug: string): Note | null {
  const raw = readOne("notes", slug);
  if (!raw) return null;
  return {
    slug,
    title: String(raw.data.title ?? slug),
    date: toDateString(raw.data.date),
    body: raw.content,
  };
}

export function getAllNotes(): Note[] {
  return listSlugs("notes")
    .map(getNote)
    .filter((note): note is Note => note !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/* ---------------- Work ---------------- */

export function getProject(slug: string): Project | null {
  const raw = readOne("work", slug);
  if (!raw) return null;
  const d = raw.data;
  return {
    slug,
    title: String(d.title ?? slug),
    summary: String(d.summary ?? ""),
    year: String(d.year ?? ""),
    role: d.role ? String(d.role) : undefined,
    team: d.team ? String(d.team) : undefined,
    tags: Array.isArray(d.tags) ? d.tags.map(String) : [],
    cover: String(d.cover ?? ""),
    href: d.href ? String(d.href) : undefined,
    repo: d.repo ? String(d.repo) : undefined,
    order: typeof d.order === "number" ? d.order : 999,
    body: raw.content,
  };
}

export function getAllProjects(): Project[] {
  return listSlugs("work")
    .map(getProject)
    .filter((project): project is Project => project !== null)
    .sort((a, b) => a.order - b.order);
}
