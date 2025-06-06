// components/ProblemTabs.tsx

"use client";

import { motion } from "framer-motion";
import { Send, Code, Bookmark, Star } from "lucide-react";

interface ProblemTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  solvedProblems: any[];
  reviewedProblems: any[];
  bookmarkedProblems: any[];
}

// 난이도 색상 함수
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "쉬움":
      return "bg-green-100 text-green-800 border-green-200";
    case "보통":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "어려움":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// 언어 색상 함수
const getLanguageColor = (language: string) => {
  switch (language) {
    case "Python":
      return "bg-blue-100 text-blue-800";
    case "JavaScript":
      return "bg-yellow-100 text-yellow-800";
    case "Java":
      return "bg-orange-100 text-orange-800";
    case "C++":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function ProblemTabs({
  activeTab,
  setActiveTab,
  solvedProblems,
  reviewedProblems,
  bookmarkedProblems,
}: ProblemTabsProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <nav className="flex">
          <button
            onClick={() => setActiveTab("submitted")}
            className={`px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 ${
              activeTab === "submitted"
                ? "border-indigo-500 text-indigo-600 bg-white shadow-sm"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              제출한 문제 ({solvedProblems.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("reviewed")}
            className={`px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 ${
              activeTab === "reviewed"
                ? "border-indigo-500 text-indigo-600 bg-white shadow-sm"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              리뷰받은 문제 ({reviewedProblems.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("bookmarked")}
            className={`px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 ${
              activeTab === "bookmarked"
                ? "border-indigo-500 text-indigo-600 bg-white shadow-sm"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              북마크한 문제 ({bookmarkedProblems.length})
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "submitted" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {solvedProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {problem.title}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(problem.difficulty)} shadow-sm`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {problem.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-md font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-1 rounded-md font-medium ${getLanguageColor(problem.language)}`}
                  >
                    {problem.language}
                  </span>
                  <span className="text-gray-500 font-medium">
                    {problem.solvedDate}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "reviewed" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {reviewedProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {problem.title}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(problem.difficulty)} shadow-sm`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {problem.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600 font-medium">
                    리뷰어: {problem.reviewer}
                  </span>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-200">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-yellow-700">
                      {problem.score}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {problem.reviewDate}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "bookmarked" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bookmarkedProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {problem.title}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(problem.difficulty)} shadow-sm`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {problem.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-1 rounded-md font-medium ${getLanguageColor(problem.language)}`}
                  >
                    {problem.language}
                  </span>
                  <span className="text-gray-500 font-medium">
                    {problem.bookmarkDate}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
