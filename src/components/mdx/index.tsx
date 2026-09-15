import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Figure from "./Figure";
import Meta from "./Meta";
import { Swatch, Swatches } from "./Swatches";
import { Screen, Screens } from "./Screens";
import { Persona, PersonaRow } from "./PersonaRow";

/**
 * MDX 元素映射：让 Markdown 的默认标签自动带上全站样式。
 *
 * 写作时只管用标准 Markdown（## 标题、> 引用、- 列表、**加粗**），
 * 排版由这里统一控制。间距只用 4/6/16/24（16/24/64/96px）。
 */
export const mdxComponents = {
  Figure,
  Meta,
  Swatches,
  Swatch,
  Screens,
  Screen,
  PersonaRow,
  Persona,

  img: (props: ComponentPropsWithoutRef<"img">) => (
    <span data-reveal className="full-bleed my-16 block">
      <Image
        src={String(props.src ?? "")}
        alt={String(props.alt ?? "")}
        width={1600}
        height={1000}
        className="max-h-[75vh] w-full object-cover"
      />
    </span>
  ),

  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 data-reveal className="mega-cn mt-24 mb-6 text-title" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-16 mb-4 text-lead font-normal" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-6 max-w-[680px] text-body text-fg-2" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mb-6 max-w-[680px] list-disc space-y-2 pl-6 text-body text-fg-2 marker:text-fg-3"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mb-6 max-w-[680px] list-decimal space-y-2 pl-6 text-body text-fg-2 marker:text-fg-3"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-normal text-fg" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-16 max-w-[680px] border-l border-line-2 pl-6 text-lead text-fg"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-sm border border-line bg-white/5 px-1.5 py-0.5 font-mono text-small text-fg"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mb-6 max-w-[680px] overflow-x-auto rounded-md border border-line bg-white/3 p-5 font-mono text-small leading-relaxed text-fg-2"
      {...props}
    />
  ),
  hr: () => <hr className="my-16 border-line" />,
  a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      href={href}
      className="link-static text-fg"
      {...(href?.startsWith("http")
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
      {...props}
    />
  ),
};
