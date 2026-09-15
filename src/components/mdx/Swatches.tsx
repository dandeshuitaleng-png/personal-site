/**
 * 色板。每个 token 并排展示浅色 / 深色两版 —— 双模式是这个项目的一部分，
 * 只放一个色块会丢掉一半信息。
 *
 * 在 MDX 里这样用（刻意用「子组件 + 纯字符串属性」的形式，
 * 不用数组字面量属性 —— MDX 对多行 JSX 表达式属性的解析不可靠）：
 *
 *   <Swatches>
 *     <Swatch name="paper" note="底色" light="#F7F9FA" dark="#0E1014" />
 *     <Swatch name="teal" note="主强调色" light="#087F78" dark="#1FBA91" />
 *   </Swatches>
 */
export function Swatches({ children }: { children: React.ReactNode }) {
  return (
    <dl className="my-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
      {children}
    </dl>
  );
}

export function Swatch({
  name,
  note,
  light,
  dark,
}: {
  name: string;
  note?: string;
  light: string;
  dark: string;
}) {
  return (
    <div>
      <div className="flex overflow-hidden rounded-lg border border-line">
        <span
          className="h-14 flex-1"
          style={{ background: light }}
          aria-hidden="true"
        />
        <span
          className="h-14 flex-1"
          style={{ background: dark }}
          aria-hidden="true"
        />
      </div>

      <dt className="mt-3.5 font-mono text-meta text-fg-3">{name}</dt>
      {note && <dd className="mt-1.5 text-small text-fg-2">{note}</dd>}
      <dd className="mt-1 font-mono text-meta text-fg-3">
        {light} / {dark}
      </dd>
    </div>
  );
}
