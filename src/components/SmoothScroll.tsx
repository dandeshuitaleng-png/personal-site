"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * 平滑滚动。
 *
 * 这是「高级感」最廉价也最有效的一层：原生滚轮是一格一格的，
 * 加上惯性和阻尼之后，整个页面的质感会立刻不同。
 *
 * 尊重 prefers-reduced-motion：开启减弱动效时直接不接管滚动。
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // 触摸设备保持原生滚动 —— 接管触屏只会显得卡
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
