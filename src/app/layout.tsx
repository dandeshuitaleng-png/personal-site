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
        {/* 背景光晕层：固定在视口上，不随滚动移动 */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="bg-glow-a breathe absolute -top-[28%] left-1/2 h-[75vh] w-[130vw] -translate-x-1/2 blur-[70px]" />
          <div className="bg-glow-b absolute top-[42%] -right-[18%] h-[62vh] w-[75vw] blur-[80px]" />
          <div className="bg-glow-c absolute -bottom-[12%] -left-[12%] h-[55vh] w-[65vw] blur-[80px]" />
        </div>

        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
