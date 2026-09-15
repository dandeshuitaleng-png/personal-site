/** 内页统一的页头 */
export default function PageHeader({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <header className="rise mb-14">
      <h1 className="grad-text text-title font-medium">{title}</h1>
      {lead && (
        <p className="mt-5 max-w-[560px] text-base leading-relaxed text-fg-2">
          {lead}
        </p>
      )}
    </header>
  );
}
