"use client";

import { Code, Award } from "lucide-react";
import Carousel from "../components/carousel";
import ProblemCard from "../components/problem-card";
import { useWeaknessProblems } from "@/app/hook/recommend/use-weakness";

interface WeaknessSectionProps {
  showSolved: boolean; // 현재 showSolved는 API 데이터에는 영향 없음
}

export default function WeaknessSection({ showSolved }: WeaknessSectionProps) {
  const userId = 3;
  const { data, isLoading, error } = useWeaknessProblems(userId);

  return (
    <section className="mb-16">
      <div className="flex items-center mb-6">
        <Code className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-900">
          약점을 보완할 문제들이에요
        </h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center text-gray-500 py-12">불러오는 중...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            문제 데이터를 불러오지 못했습니다.
          </div>
        ) : data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Award className="h-12 w-12 mb-4 text-gray-300" />
            <p>추천 문제가 없습니다.</p>
          </div>
        ) : (
          <Carousel itemsPerPage={4}>
            {data?.map((problem) => (
              <ProblemCard
                key={problem.problemId}
                id={problem.problemId}
                title={problem.title}
                level={1}
                tags={problem.tag.split(",")}
                isSolved={false}
              />
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}
