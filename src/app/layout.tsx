import type { Metadata } from "next";
import { Noto_Serif_SC, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import ScrollEffects from "@/components/ScrollEffects";
import { site } from "@/data/site";
import "./globals.css";

// 思源宋体：标题与正文主字体（自带拉丁字形，中英文同源）
const serifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif-sc",
  display: "swap",
  preload: false,
});

// 等宽：只用于编号、日期、标签这类小信息
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.intro,
  keywords: [site.name, site.nameEn, "AI 全栈开发", "UI/UX", "作品集"],
  authors: [{ name: site.name, url: site.links[0]?.href }],
  openGraph: {
    title: `${site.name} · ${site.role}`,
    description: site.intro,
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${serifSC.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        {/* 交互层：平滑滚动 + 跟随光标的圆环 */}
        <SmoothScroll />
        <Cursor />
        <ScrollEffects />

        <div
          aria-hidden="true"
          className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="fine-grid absolute inset-0" />
          <div className="light-top absolute inset-x-0 top-0 h-[75vh]" />
        </div>

        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
