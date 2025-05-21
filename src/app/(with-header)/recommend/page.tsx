"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface RecommendationPageProps {
  username: string;
}

export default function RecommendationPage({
  username,
}: RecommendationPageProps) {
  const [showSolved, setShowSolved] = useState(false);

  // Mock data for recommended problems
  const recommendedProblems = [
    {
      id: 1,
      title: "생일파티 길찾기",
      level: 3,
      tags: ["그래디"],
      isSolved: false,
    },
    {
      id: 2,
      title: "생일파티 길찾기",
      level: 3,
      tags: [],
      isSolved: false,
    },
    {
      id: 3,
      title: "미로 탈출하기",
      level: 4,
      tags: ["BFS", "그래프"],
      isSolved: false,
    },
    {
      id: 4,
      title: "최단 경로 찾기",
      level: 2,
      tags: ["다익스트라"],
      isSolved: false,
    },
  ];

  const similarProblems = Array(8)
    .fill(null)
    .map((_, i) => ({
      id: 100 + i,
      title: `유사 문제 ${i + 1}`,
      level: Math.floor(Math.random() * 5) + 1,
      tags: ["알고리즘"],
      isSolved: Math.random() > 0.7,
    }));

  const recentCodeReviews = Array(8)
    .fill(null)
    .map((_, i) => ({
      id: 200 + i,
      title: `코드 리뷰 ${i + 1}`,
      level: Math.floor(Math.random() * 5) + 1,
      tags: ["코드리뷰"],
      isSolved: Math.random() > 0.7,
    }));

  return (
    <div className="min-h-screen bg-white">
     
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Recommendation Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">
            {username}님을 위한 추천문제
          </h1>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-end items-center mb-4">
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

        <section className="mb-16">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            다음으로 풀면 좋은 문제들이에요
          </h2>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
              {recommendedProblems.map((problem, index) => (
                <div
                  key={problem.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-medium text-gray-900">
                      {problem.title}
                    </h3>
                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-md">
                      <span className="text-indigo-700 font-semibold text-sm">
                        {problem.level}
                      </span>
                    </div>
                  </div>
                  {problem.tags.length > 0 && (
                    <div className="mt-2">
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2"
                        >
                          # {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </section>

        {/* Similar Problems Section */}
        <section className="mb-16">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            이런 유형의 문제를 많이 풀려요
          </h2>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
              {similarProblems.slice(0, 4).map((problem) => (
                <div
                  key={problem.id}
                  className="bg-gray-100 border border-gray-200 rounded-lg p-4 h-32 flex items-center justify-center"
                >
                  <span className="text-gray-400">문제 카드 {problem.id}</span>
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </section>

        {/* Code Reviews Section */}
        <section className="mb-16">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            이런 유형의 코드리뷰를 받았어요
          </h2>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
              {recentCodeReviews.slice(0, 4).map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-100 border border-gray-200 rounded-lg p-4 h-32 flex items-center justify-center"
                >
                  <span className="text-gray-400">
                    코드리뷰 카드 {review.id}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
