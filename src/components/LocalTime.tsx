"use client";

import { useEffect, useState } from "react";

/**
 * 页脚的本地时间 —— 学 Paco 那种「网站背后有个人在」的小细节。
 *
 * 服务端渲染成占位符，挂载后才写入真实时间，
 * 否则服务端和客户端的时间不一致会导致 hydration 报错。
 */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

    setTime(format());
    const id = setInterval(format, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" title="我这里的当前时间">
      {time ?? "--:--"} 本地
    </span>
  );
}
