/** 内页页头：大标题 + 细线，与首页同一套排版语言 */
export default function PageHeader({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <header className="rise mb-16">
      <h1 className="mega-cn text-display font-light">{title}</h1>
      {lead && (
        <p className="mt-7 max-w-[540px] text-base leading-relaxed text-fg-2">
          {lead}
        </p>
      )}
      <div className="rule-in mt-10 h-px w-full bg-line" />
    </header>
  );
}
