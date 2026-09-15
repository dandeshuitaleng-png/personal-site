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
    <span className="full-bleed my-16 block">
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
    <h2
      className="mega-cn mt-20 mb-6 text-title font-light text-fg"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-12 mb-4 text-lg font-normal text-fg" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="mb-6 max-w-[680px] text-base leading-relaxed text-fg-2"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mb-6 max-w-[680px] list-disc space-y-2 pl-6 text-base leading-relaxed text-fg-2 marker:text-fg-3"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mb-6 max-w-[680px] list-decimal space-y-2 pl-6 text-base leading-relaxed text-fg-2 marker:text-fg-3"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-normal text-fg" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-14 max-w-[680px] border-l border-line-2 pl-6 text-lg leading-relaxed text-fg italic"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-sm border border-line bg-white/5 px-1.5 py-0.5 font-mono text-[0.9em] text-fg"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mb-6 max-w-[680px] overflow-x-auto rounded-md border border-line bg-white/3 p-5 font-mono text-sm leading-relaxed text-fg-2"
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
