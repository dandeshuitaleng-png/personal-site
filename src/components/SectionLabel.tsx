/** 板块标题：宽字距小标签 + 贯穿全宽的细线，作为版面的分隔标尺 */
export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-14">
      <h2 className="font-mono text-label tracking-wider-x text-fg-3 uppercase">
        {children}
      </h2>
      <div className="mt-5 h-px w-full bg-line" />
    </div>
  );
}
