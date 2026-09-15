"use client";

import { useEffect, useRef } from "react";

/**
 * 跟随光标。
 *
 * 刻意**不隐藏系统光标** —— 只在它旁边跟一个带阻尼的圆环。
 * 完全替换光标会让用户失去精确点击的手感，是常见的过度设计。
 * 这里保留原生光标的精确性，圆环只负责提供「页面在回应你」的感觉。
 *
 * 只在精确指针设备（鼠标）上启用，触屏直接不渲染。
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    // 悬停到可交互元素上时圆环放大
    const onOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest("a, button, [data-cursor-hover]");
      targetScale = interactive ? 2.2 : 1;
    };

    const onLeave = () => {
      visible = false;
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const loop = () => {
      // 阻尼跟随：圆环落后于光标，产生重量感
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (targetScale - scale) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-9 w-9 rounded-full border border-fg/35 opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}
