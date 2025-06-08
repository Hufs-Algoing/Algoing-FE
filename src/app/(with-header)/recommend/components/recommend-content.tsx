"use client";

import { useState } from "react";
import IntroSection from "./intro-section";
import { useAllRecommendations } from "@/app/hook/recommend/use-all-recommend";
import { PageLoading } from "@/app/_components/loading";
import { RecommendSection } from "./recommend-section";
import { BookOpen, Code, Sparkles } from "lucide-react";

export default function RecommendationContent() {
  const [showSolved, setShowSolved] = useState(false);
  const userId = 3;
  const { data: recommendationData, isLoading } = useAllRecommendations(
    userId ?? 0
  );

  const daily = recommendationData?.dailyRecommendations ?? [];
  const inc = recommendationData?.incProblemRecommendations ?? [];
  const weak = recommendationData?.weaknessRecommendations ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <IntroSection
        // username={userId}
        level={1}
        profileImage=""
        streak={0}
        totalPoints={0}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end items-center mb-8">
          <span className="text-sm text-gray-600 mr-2">풀었던 문제 보기</span>
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              showSolved ? "bg-indigo-600" : "bg-gray-200"
            }`}
            onClick={() => setShowSolved(!showSolved)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showSolved ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <>
          {isLoading ? (
            <PageLoading />
          ) : (
            <>
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
            </>
          )}
        </>

        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-10 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  이번 주 챌린지
                </h3>
                <p className="text-purple-100 mb-4">
                  그래프 알고리즘 마스터하기: 5개의 그래프 관련 문제를 풀고
                  특별한 배지를 획득하세요!
                </p>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full px-3 py-1 text-sm text-white">
                    진행률: 2/5 완료
                  </div>
                  <div className="ml-4">
                    <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      챌린지 보기
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 text-xl font-bold">
                        40%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
