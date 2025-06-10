"use client";

import Link from "next/link";
import ContributionCalendar from "./components/Calendar";
import Progress from "./components/Progress";
import RecommendedProblems from "./components/Recommend";
import {
  FaCode,
  FaChartLine,
  FaRobot,
  FaStar,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { Sparkles, TrendingUp, Award } from "lucide-react";
import Image from "next/image";
import { useMyInfo } from "@/app/hook/user/useLoadUser";
import { useEffect } from "react";
import { useUserStore } from "@/app/_store/use-userStore";
import { useLatestReviewedProblem } from "@/app/hook/problem/use-latest-reivewed-1";
import { useSolvedProblems } from "@/app/hook/mypage/use-solved";

export default function UserDashboard() {
  const { data: myInfo } = useMyInfo();
  const setUser = useUserStore((state) => state.setUser);
  const { data } = useSolvedProblems(3);

  useEffect(() => {
    console.log("✅ useEffect 진입");
    if (myInfo) {
      console.log("✅ /myinfo 응답값:", myInfo);
      setUser(myInfo); // Zustand store에 저장
    }
  }, [myInfo, setUser]);

  const { data: latestReview } = useLatestReviewedProblem(3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 mb-8 border border-purple-100 dark:border-purple-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl"></div>

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* 프로필 이미지 섹션 */}
          <div className="relative">
            <Link href="/profile" className="block">
              <div className="relative w-24 h-24 group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Image
                  src={"/profile5.png"}
                  width={96}
                  height={96}
                  alt="프로필"
                  className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>

          {/* 사용자 정보 섹션 */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  사용자
                </h2>
                <span className="text-sm bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full font-semibold shadow-md">
                  Lv. 5
                </span>
              </div>
            </div>

            {/* 통계 요약 */}
            <div className="flex items-center justify-center md:justify-start gap-6 mb-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <FaCode className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">{data?.length}</span>
                <span>문제 해결</span>
              </div>
            </div>

            <Progress userId={3} />
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-col gap-3 mt-6">
            <button className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <FaChartLine className="w-4 h-4 " />
                <span>내 활동</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 나머지 콘텐츠 */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        <div className="border dark:border-gray-700 rounded-xl p-4">
          <ContributionCalendar userId={3} year={2025} month={6} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden border-0 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 shadow-lg ">
            <div className="relative p-6 h-[250px] flex flex-col">
              {/* 헤더 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-md">
                  <FaRobot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    최근 AI 코드 리뷰
                  </h3>
                  <p className="text-xs text-gray-600">
                    AI가 분석한 코드 피드백
                  </p>
                </div>
                <Sparkles className="w-4 h-4 text-emerald-500 ml-auto " />
              </div>

              <div className="flex-1">
                {latestReview ? (
                  <Link href={`/ai-review`} className="block h-full">
                    <div className="group bg-white/70  backdrop-blur-sm p-5 rounded-xl border border-emerald-100 h-full flex flex-col justify-between  transition-all duration-300 hover:shadow-md">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100  px-2 py-1 rounded-md">
                              #{latestReview.problemNum}
                            </span>
                            <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-md font-medium shadow-sm">
                              {latestReview.language}
                            </span>
                          </div>
                          <FaArrowRight className="w-3 h-3 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300" />
                        </div>

                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium line-clamp-2 leading-relaxed">
                          {latestReview.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 ">
                        <div className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          <span>
                            {new Date(
                              latestReview.createdAt
                            ).toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <TrendingUp className="w-3 h-3" />
                          <span className="font-medium">분석 완료</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-dashed border-emerald-200 dark:border-emerald-700 h-full flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-3">
                      <FaRobot className="w-6 h-6 text-emerald-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      최근 리뷰가 없습니다
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      코드를 제출하고 AI 리뷰를 받아보세요!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden border-0 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50  shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative p-6 h-[420px] flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    오늘의 추천문제
                  </h3>
                  <p className="text-xs text-gray-600">solved.ac 티어 기반</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <FaStar className="w-4 h-4 text-pink-300 " />
                </div>
              </div>

              <RecommendedProblems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
