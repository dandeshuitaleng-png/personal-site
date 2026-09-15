/** 板块小标题：渐变短线 + 等宽大写，做层级但不抢戏 */
export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex items-center gap-3.5">
      <span
        aria-hidden="true"
        className="h-px w-8 bg-gradient-to-r from-accent to-accent-2"
      />
      <h2 className="font-mono text-meta text-fg-3 uppercase">{children}</h2>
    </div>
  );
}
