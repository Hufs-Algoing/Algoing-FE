"use client";

import { useState, useRef } from "react";
import StatsCards from "./components/stats-cards";
import ActivityChart from "./components/activity-chart";
import { ProblemTabs } from "./components/problem-tabs";
import MypageIntroSection from "./components/intro-section";
import { PerformanceChart } from "./components/performance-chart";

const solvedProblems = [
  {
    id: 1,
    title: "두 수의 합",
    difficulty: 1,
    tags: ["해시", "배열"],
    solvedDate: "2024-01-15",
    language: "Python",
  },
  {
    id: 2,
    title: "최단경로",
    difficulty: 3,
    tags: ["그래프", "다익스트라"],
    solvedDate: "2024-01-14",
    language: "Java",
  },
  {
    id: 3,
    title: "이진 탐색",
    difficulty: 2,
    tags: ["이분탐색"],
    solvedDate: "2024-01-13",
    language: "C++",
  },
  {
    id: 4,
    title: "동적 계획법",
    difficulty: 4,
    tags: ["DP"],
    solvedDate: "2024-01-12",
    language: "Python",
  },
];

const reviewedProblems = [
  {
    id: 101,
    title: "백트래킹 알고리즘",
    difficulty: 3,
    tags: ["백트래킹", "재귀"],
    reviewDate: "2024-01-10",
    reviewer: "AI 리뷰어",
    score: 85,
  },
  {
    id: 102,
    title: "트리 순회",
    difficulty: 2,
    tags: ["트리", "DFS"],
    reviewDate: "2024-01-08",
    reviewer: "김개발",
    score: 92,
  },
  {
    id: 103,
    title: "그리디 알고리즘",
    difficulty: 3,
    tags: ["그리디"],
    reviewDate: "2024-01-05",
    reviewer: "AI 리뷰어",
    score: 78,
  },
];

const bookmarkedProblems = [
  {
    id: 201,
    title: "최장 증가 부분 수열",
    difficulty: 4,
    tags: ["DP", "이분탐색"],
    bookmarkDate: "2024-01-14",
    language: "Python",
  },
  {
    id: 202,
    title: "네트워크 플로우",
    difficulty: 5,
    tags: ["그래프", "최대유량"],
    bookmarkDate: "2024-01-12",
    language: "C++",
  },
  {
    id: 203,
    title: "문자열 매칭",
    difficulty: 3,
    tags: ["문자열", "KMP"],
    bookmarkDate: "2024-01-10",
    language: "Java",
  },
];

const activityData = [
  { date: "01-09", problems: 1, day: "월" },
  { date: "01-10", problems: 2, day: "화" },
  { date: "01-11", problems: 0, day: "수" },
  { date: "01-12", problems: 3, day: "목" },
  { date: "01-13", problems: 1, day: "금" },
  { date: "01-14", problems: 2, day: "토" },
  { date: "01-15", problems: 1, day: "일" },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("submitted");
  const problemsSectionRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MypageIntroSection />
        <StatsCards
          solvedCount={solvedProblems.length}
          reviewedCount={reviewedProblems.length}
          bookmarkedCount={bookmarkedProblems.length}
          onClickTab={scrollToProblems}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ActivityChart activityData={activityData} />
          <PerformanceChart />
        </div>
        <div ref={problemsSectionRef}>
          <ProblemTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            solvedProblems={solvedProblems}
            reviewedProblems={reviewedProblems}
            bookmarkedProblems={bookmarkedProblems}
          />
        </div>
      </div>
    </div>
  );
}
