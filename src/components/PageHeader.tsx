/**
 * 内页页头：大标题 + 细线，与首页同一套模数。
 *
 * 用 data-reveal（GSAP 滚动浮现）而不是 rise（CSS 进场动画）——
 * 两者都动 opacity/transform，同时加会互相覆盖。
 */
export default function PageHeader({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <header data-reveal className="mb-16">
      <h1 className="mega-cn text-display">{title}</h1>
      {lead && (
        <p className="mt-6 max-w-[480px] text-body text-fg-2">{lead}</p>
      )}
      <div className="rule-in mt-16 h-px w-full bg-line" />
    </header>
  );
}
