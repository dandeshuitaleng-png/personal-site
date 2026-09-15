/**
 * 全站信息集中在这里。改这一个文件就能更新导航、首屏和页脚。
 *
 * ⚠️ role / tagline / bio / now 是我按「AI 编程 · AI 全栈开发 · UI/UX」
 *    这个定位起的稿，语气和事实都需要你自己核一遍再上线。
 */

export type SocialLink = {
  label: string;
  href: string;
};

export const site = {
  /** 中文名，首屏大标题 */
  name: "黄念鹏",
  /** 英文名，用于导航栏和页脚 */
  nameEn: "Huang Nianpeng",

  /** 首屏的一句话身份表达 —— 必须极短，长了就破坏留白 */
  role: "AI 全栈开发 · UI/UX",

  /** 斜体标语，学 Paco 那种。一句就够，别写成列表 */
  tagline: "从一个想法到上线，一个人走完",

  /** 首屏下面的短自述，两三句封顶。详细经历放「关于」页 */
  intro:
    "用 AI 编程的方式做全栈开发，同时自己管界面和交互。喜欢把原型到上线之间的链路压到最短。",

  /** 关于页正文，每段一个字符串 */
  bio: [
    "我做 AI 全栈开发——从数据、接口到前端界面，整条链路自己走通。同时因为一直在做 UI/UX，我不太习惯把「设计稿」和「能跑的东西」当成两件事。",
    "现在的工作方式是用 AI 编程工具把实现成本压下来，把省下的精力放到判断上：这个交互是不是真的解决问题？这个抽象是不是多余？",
    "这个网站本身也是这么做的。它的排版和交互参考了 Samuel Kraft（骨架）和 Paco Coursey（气质），但没有直接套模板。",
  ],

  /** Now —— 学 Paco 的 Now，让网站有「人的存在感」 */
  now: {
    label: "Now",
    text: "在做 AI 辅助的开发流程相关的东西，还在打磨这个站。",
  },

  email: "your@email.com",

  /** 所在城市，显示在页脚 */
  location: "城市待填",

  links: [
    { label: "GitHub", href: "https://github.com/dandeshuitaleng-png" },
    { label: "邮箱", href: "mailto:your@email.com" },
  ] as SocialLink[],

  /** 页脚版权起始年份 */
  since: 2020,
};

/** 导航 —— 克制到四个 */
export const nav = [
  { label: "Work", href: "/work" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
