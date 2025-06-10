"use client";

import { useState, useRef } from "react";
import StatsCards from "./components/stats-cards";
import MypageIntroSection from "./components/intro-section";
import { useSolvedProblems } from "@/app/hook/mypage/use-solved";
import { useReviewedProblems } from "@/app/hook/mypage/use-reviewed";
import { useBookmarkedProblems } from "@/app/hook/mypage/use-bookmarked";
import { PageLoading } from "@/app/_components/loading";
import { useSnapshotHistory } from "@/app/hook/use-snapshot";
import dynamic from "next/dynamic";
import SkeletonTabs from "./components/skelaton-tab";

const CodeAnalysisChart = dynamic(() => import("./components/code-chart"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
});

const PerformanceChart = dynamic(() => import("./components/tag-chart"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
});
const ProblemTabs = dynamic(() => import("./components/problem-tabs"), {
  ssr: false,
  loading: () => <SkeletonTabs />,
});

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("submitted");
  const problemsSectionRef = useRef<HTMLDivElement>(null);
  const userId = 3;
  const { data: snapshotresult } = useSnapshotHistory(userId);

  const { data: solvedProblems = [], isLoading: isSolvedLoading } =
    useSolvedProblems(userId);
  const { data: reviewedProblems = [], isLoading: isReviewedLoading } =
    useReviewedProblems(userId);
  const { data: bookmarkedProblems = [], isLoading: isBookmarkedLoading } =
    useBookmarkedProblems(userId);

  if (!userId || isSolvedLoading || isReviewedLoading || isBookmarkedLoading) {
    return <PageLoading />;
  }

  const scrollToProblems = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      problemsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MypageIntroSection />
        <StatsCards
          solvedCount={solvedProblems.length}
          reviewedCount={reviewedProblems.length}
          bookmarkedCount={bookmarkedProblems.length}
          onClickTab={scrollToProblems}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CodeAnalysisChart data={snapshotresult} />

          <PerformanceChart userId={userId} />
        </div>
        <div ref={problemsSectionRef}>
          <ProblemTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            solvedProblems={solvedProblems}
            bookmarkedProblems={bookmarkedProblems}
          />
        </div>
      </div>
    </div>
  );
}
