import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Figure from "./Figure";
import Meta from "./Meta";

/**
 * MDX 元素映射：让 Markdown 的默认标签自动带上全站样式。
 *
 * 写作时只管用标准 Markdown（## 标题、> 引用、- 列表、**加粗**），
 * 排版由这里统一控制，不需要在正文里写 class。
 */
export const mdxComponents = {
  Figure,
  Meta,

  img: (props: ComponentPropsWithoutRef<"img">) => (
    <span className="glass my-12 block overflow-hidden rounded-2xl">
      <Image
        src={String(props.src ?? "")}
        alt={String(props.alt ?? "")}
        width={1600}
        height={1000}
        className="w-full"
      />
    </span>
  ),

  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-20 mb-6 text-title font-medium tracking-tight text-fg"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-12 mb-4 text-lg font-medium text-fg" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="mb-6 max-w-[680px] text-base leading-relaxed text-fg-2"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mb-6 max-w-[680px] list-disc space-y-2 pl-6 text-base leading-relaxed text-fg-2 marker:text-accent"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mb-6 max-w-[680px] list-decimal space-y-2 pl-6 text-base leading-relaxed text-fg-2 marker:text-accent"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium text-fg" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-14 max-w-[680px] rounded-r-xl border-l-2 border-accent-2 bg-white/3 py-2 pl-6 text-lg leading-relaxed text-fg italic"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-md border border-line bg-white/5 px-1.5 py-0.5 font-mono text-[0.9em] text-accent-2"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="glass mb-6 max-w-[680px] overflow-x-auto rounded-xl p-5 font-mono text-sm leading-relaxed text-fg-2"
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
