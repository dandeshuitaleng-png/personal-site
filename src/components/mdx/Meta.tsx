/**
 * 详情页顶部的信息栏。在 MDX 里这样用：
 *
 *   <Meta year="2025" role="UI/UX 设计" team="3 人" />
 *
 * 不传的字段会自动省略。
 */
export default function Meta({
  year,
  role,
  team,
}: {
  year?: string;
  role?: string;
  team?: string;
}) {
  const items = [
    { label: "Year", value: year },
    { label: "Role", value: role },
    { label: "Team", value: team },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <dl className="my-12 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-line py-8 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="font-mono text-meta text-ink-3 uppercase">
            {item.label}
          </dt>
          <dd className="mt-2 text-sm text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
