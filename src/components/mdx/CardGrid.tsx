/**
 * 卡片网格。
 *
 * 用途是给版面提供「块感」—— 通篇流式文字会读得很平，
 * 成组的卡片能把节奏切成一块一块。
 *
 * 在 MDX 里这样用：
 *
 *   <CardGrid cols={3}>
 *     <Card index="01" title="录音">最长 15 秒。</Card>
 *     <Card index="02" title="本地校验">在设备上检查时长、音量、峰值。</Card>
 *   </CardGrid>
 */
export function CardGrid({
  cols = 3,
  children,
}: {
  cols?: 2 | 3;
  children: React.ReactNode;
}) {
  return (
    <div
      data-reveal
      data-reveal-stagger="true"
      className={
        cols === 2
          ? "my-16 grid gap-4 sm:grid-cols-2"
          : "my-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {children}
    </div>
  );
}

/** 带焦点的统计卡：一个大数字 + 说明 */
export function StatCard({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="glass glass-card rounded-2xl p-7">
      <p className="mega-cn text-title text-fg tabular-nums">{value}</p>
      <p className="mt-3 text-lead text-fg-2">{label}</p>
      {note && <p className="mt-2 text-small text-fg-3">{note}</p>}
    </div>
  );
}

export function Card({
  index,
  title,
  children,
}: {
  index?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="glass glass-card rounded-2xl p-7">
      {index && (
        <span className="font-mono text-meta tracking-normal text-fg-3 tabular-nums">
          {index}
        </span>
      )}
      <h3 className="mt-4 text-lead text-fg">{title}</h3>
      {children && (
        <p className="mt-3 text-small leading-relaxed text-fg-2">{children}</p>
      )}
    </div>
  );
}
