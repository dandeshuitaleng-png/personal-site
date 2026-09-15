import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

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
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* 背景层：极细网格 + 颗粒噪点 + 顶部单点高光。
            刻意不用大团径向光晕 —— 那是「AI 深色主题」的标志性做法。 */}
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
