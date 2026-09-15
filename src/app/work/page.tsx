import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkList from "@/components/WorkList";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "参与得比较深的项目，包含设计决策和实现路径。",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28">
      <PageHeader
        title="Work"
        lead="挑了几个自己参与得比较深的项目。每个都尽量讲清楚当时的判断，而不只是最后长什么样。"
      />
      <WorkList items={getAllProjects()} />
    </div>
  );
}
