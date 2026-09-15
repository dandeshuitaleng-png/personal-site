/** 板块小标题 —— 等宽 + 大写 + 极淡，做层级但不抢戏 */
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-10 font-mono text-meta text-ink-3 uppercase">
      {children}
    </h2>
  );
}
