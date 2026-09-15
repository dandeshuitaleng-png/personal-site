/** 内页统一的页头 */
export default function PageHeader({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <header className="rise mb-16">
      <h1 className="text-title font-medium">{title}</h1>
      {lead && (
        <p className="mt-4 max-w-[560px] text-base leading-relaxed text-ink-2">
          {lead}
        </p>
      )}
    </header>
  );
}
