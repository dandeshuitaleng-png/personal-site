"use client";

import { useEffect, useRef } from "react";

/**
 * 巨型名字的逐字响应。
 *
 * 不是整块位移 —— 每个字有自己的位移和旋转，且衰减是平方的，
 * 所以光标掠过时是一道「波」扫过字面，而不是整块推走。
 *
 * 性能：每帧只对容器调一次 getBoundingClientRect，
 * 每个字的位置用 offsetLeft/offsetTop 算（这两个不随滚动变化），
 * 避免每帧对每个字都触发重排。
 */
export default function HeroName({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const chars = Array.from(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-char]"));
    if (spans.length === 0) return;

    // 每个字的目标位移 / 当前位移（用于插值）
    const st = spans.map(() => ({ tx: 0, ty: 0, tr: 0, x: 0, y: 0, r: 0 }));

    let mx = -99999;
    let my = -99999;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -99999;
      my = -99999;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const RADIUS = 340;
    let raf = 0;

    const loop = () => {
      const host = el.getBoundingClientRect();

      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const s = st[i];

        // 字心在视口中的位置
        const cx = host.left + span.offsetLeft + span.offsetWidth / 2;
        const cy = host.top + span.offsetTop + span.offsetHeight / 2;

        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS) {
          // 平方衰减：越近推得越狠，边缘平滑归零
          const f = (1 - dist / RADIUS) ** 2;
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          s.tx = nx * f * 52;
          s.ty = ny * f * 52 - f * 20;
          s.tr = nx * f * 7;
        } else {
          s.tx = 0;
          s.ty = 0;
          s.tr = 0;
        }

        s.x += (s.tx - s.x) * 0.13;
        s.y += (s.ty - s.y) * 0.13;
        s.r += (s.tr - s.r) * 0.13;

        span.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) rotate(${s.r.toFixed(2)}deg)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      spans.forEach((s) => (s.style.transform = ""));
    };
  }, []);

  return (
    <h1 ref={ref} className="mega-cn text-mega">
      {chars.map((c, i) => (
        <span
          key={`${c}-${i}`}
          data-char
          className="inline-block will-change-transform"
        >
          {c}
        </span>
      ))}
    </h1>
  );
}
