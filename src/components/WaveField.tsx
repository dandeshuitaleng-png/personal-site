"use client";

import { useEffect, useRef } from "react";

/**
 * 音频波形场 —— 首屏背后的实时图形。
 *
 * 主题理由：这个人的作品是关于「声音」的，网站该继承这个主题。
 *
 * 刻意不用等距平行线 —— 那样读起来是装饰条纹，不是波形。
 * 这里用非均匀分布 + 三条不同频率的谐波叠加 + 缓慢横向漂移，
 * 让它读起来像一段正在被分析的声音。
 */
export default function WaveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let mx = 0.5;
    let my = 0.5;
    let tmx = 0.5;
    let tmy = 0.5;
    const onMove = (e: PointerEvent) => {
      tmx = e.clientX / window.innerWidth;
      tmy = e.clientY / window.innerHeight;
    };
    const onLeave = () => {
      tmx = 0.5;
      tmy = 0.5;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    // 非均匀的垂直分布：中间密、上下疏，像声谱的包络
    const LINES = 7;
    const ratios = [0.30, 0.40, 0.465, 0.51, 0.565, 0.65, 0.79];

    // 每条线自己的相位偏移与漂移速度，避免整体同步
    const seeds = ratios.map((_, i) => ({
      phase: i * 1.37,
      drift: 0.06 + i * 0.021,
      amp: 0.62 + ((i * 37) % 11) / 11, // 0.6-1.6 的伪随机
    }));

    let t = 0;
    let raf = 0;
    let running = true;

    const draw = () => {
      if (!running) return;
      t += 0.005;
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      ctx.clearRect(0, 0, w, h);

      for (let li = 0; li < LINES; li++) {
        const s = seeds[li];
        const baseY = h * ratios[li];
        const phase = t * (0.9 + li * 0.07) + s.phase;
        const amp = (22 + li * 5 + my * 54) * s.amp;

        // 光标与这条线的垂直距离 → 鼓起强度
        const yDist = Math.abs(baseY / h - my);
        const strength = Math.max(0, 1 - yDist * 2.2);

        ctx.beginPath();
        const step = Math.max(4, Math.floor(w / 280));
        for (let x = 0; x <= w; x += step) {
          const p = x / w;

          // 横向漂移：波形整体缓慢向左流动
          const flow = p + t * s.drift;

          // 光标附近的钟形鼓包（只在水平方向）
          const bulge = Math.exp(-((p - mx) ** 2) / 0.016) * strength * 104;

          const y =
            baseY +
            Math.sin(flow * 4.1 + phase) * amp +
            Math.sin(flow * 9.7 - phase * 1.6) * amp * 0.32 +
            Math.sin(flow * 21.3 + phase * 0.8) * amp * 0.11 +
            bulge;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // 靠近中心的那几条亮一些，上下两端更淡
        const centerBias = 1 - Math.abs(ratios[li] - 0.52) * 1.7;
        const alpha = (0.035 + centerBias * 0.055) * 1;
        ctx.strokeStyle = `rgba(255,255,255,${Math.max(0.02, alpha)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
