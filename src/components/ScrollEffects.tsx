"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * 滚动叙事的统一入口。
 *
 * 用 data 属性驱动，而不是把每个板块都包成客户端组件 ——
 * 页面本身仍是服务端渲染的静态 HTML，只有这一个组件在客户端跑，
 * SEO 和首屏都不受影响。
 *
 * ⚠️ 关键设计：**默认状态是「可见」的，动画只在触发时才反向播放。**
 *    不用 gsap.from() 直接挂在元素上 —— 那会把元素立刻置成透明，
 *    一旦 JS 加载失败或延迟，整页内容就是不可见的。
 *    这里改用 ScrollTrigger 的 onEnter 回调，在真正进入视口时才播 from。
 *
 * 三类效果：
 *   data-reveal        进入视口时上浮淡入（data-reveal-stagger 对子元素逐个延迟）
 *   data-hero-parallax 首屏内容随滚动分层位移
 *   data-screens-pin   截图横排滚到时钉住，纵向滚动转成横向推进
 */
export default function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── 1. 通用浮现 ────────────────────────────────── */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const stagger = el.dataset.revealStagger === "true";
        const targets =
          stagger && el.children.length > 0 ? Array.from(el.children) : el;

        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          // 触发时才播 —— 在此之前元素保持自然可见状态
          onEnter: () =>
            gsap.from(targets, {
              y: 36,
              opacity: 0,
              duration: 0.85,
              ease: "power3.out",
              stagger: stagger ? 0.09 : 0,
            }),
        });
      });

      /* ── 2. 首屏视差 ────────────────────────────────── */
      const heroContent =
        document.querySelector<HTMLElement>("[data-hero-parallax]");
      const heroSection = document.querySelector<HTMLElement>("[data-hero]");
      if (heroContent && heroSection) {
        gsap.to(heroContent, {
          yPercent: 18,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      /* ── 3. 截图横排：钉住 + 横向推进 ────────────────── */
      const wrap = document.querySelector<HTMLElement>("[data-screens-pin]");
      const rail = wrap?.querySelector<HTMLElement>("[data-screens-rail]");
      if (wrap && rail) {
        // 只有在内容确实溢出时才启用 —— 否则会钉住一段没有位移的区域，
        // 用户会以为页面卡死了
        const overflow = () => rail.scrollWidth - wrap.clientWidth;

        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => {
            if (overflow() <= 8) return;

            gsap.to(rail, {
              x: () => -overflow(),
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "center center",
                end: () => `+=${overflow()}`,
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });
          },
        });
      }
    });

    // 中文字体加载完成后字宽会变，重新测量一次触发点
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => ctx.revert();
  }, []);

  return null;
}
