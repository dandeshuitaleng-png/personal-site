import Image from "next/image";

/**
 * 用户画像组。
 *
 * 不能用通用的 <Figure> —— 那是全出血的，会给宽幅配图用。
 * 画像是 600px 的方形插画，全出血放到 1440px 宽会糊成一片。
 * 这里改成三栏定宽。
 *
 *   <PersonaRow>
 *     <Persona src="/xxx.webp" alt="..." title="..." note="..." />
 *   </PersonaRow>
 */
export function PersonaRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-16 grid gap-10 sm:grid-cols-3 sm:gap-6">{children}</div>
  );
}

export function Persona({
  src,
  alt,
  title,
  note,
}: {
  src: string;
  alt: string;
  title: string;
  note?: string;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-line bg-white/3">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={600}
          className="w-full"
        />
      </div>
      <figcaption className="mt-5">
        <p className="text-lead text-fg">{title}</p>
        {note && (
          <p className="mt-2 text-small leading-relaxed text-fg-3">{note}</p>
        )}
      </figcaption>
    </figure>
  );
}
