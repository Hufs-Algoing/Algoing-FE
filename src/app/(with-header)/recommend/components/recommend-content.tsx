"use client";

import IntroSection from "./intro-section";
import { useAllRecommendations } from "@/app/hook/recommend/use-all-recommend";
import { PageLoading } from "@/app/_components/loading";
import { BookOpen, Code, Sparkles } from "lucide-react";
import { Suspense, lazy } from "react";
import { mockMyInfo } from "@/app/_mock/myinfo";
// import { useUserStore } from "@/app/_store/use-userStore";

export default function RecommendationContent() {
  const userId = 3;
  const { data: recommendationData, isLoading } = useAllRecommendations(
    userId ?? 0
  );
  // const { username } = useUserStore();

  const daily = recommendationData?.dailyRecommendations ?? [];
  const inc = recommendationData?.incProblemRecommendations ?? [];
  const weak = recommendationData?.weaknessRecommendations ?? [];
  const RecommendSection = lazy(() => import("./recommend-section"));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <IntroSection
        username={mockMyInfo.username}
        level={1}
        profileImage=""
        streak={0}
        totalPoints={0}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-end items-center mb-8"></div>
        <>
          {isLoading ? (
            <PageLoading />
          ) : (
            <Suspense fallback={<PageLoading />}>
              <RecommendSection
                title="티어 기반 맞춤 추천 문제"
                icon={<Sparkles className="h-6 w-6" />}
                problems={daily}
              />
              <RecommendSection
                title="많이 틀린 문제 유형 기반 추천"
                icon={<BookOpen className="h-6 w-6" />}
                problems={inc}
              />
              <RecommendSection
                title="약점을 보완할 문제들이에요"
                icon={<Code className="h-6 w-6" />}
                problems={weak}
              />
            </Suspense>
          )}
        </>
      </main>
    </div>
  );
}
