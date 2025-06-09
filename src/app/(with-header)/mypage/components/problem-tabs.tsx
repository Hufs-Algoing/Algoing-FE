"use client";

import { Send, Code, Bookmark } from "lucide-react";

interface ProblemTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  solvedProblems: any[];
  reviewedProblems: any[];
  bookmarkedProblems: any[];
}

const getLanguageColor = (language: string) => {
  switch (language) {
    case "python":
      return "bg-blue-50 text-blue-800";
    case "javascript":
      return "bg-yellow-50 text-yellow-800";
    case "java":
      return "bg-orange-50 text-orange-800";
    case "node.js":
      return "bg-purple-50 text-purple-800";
    default:
      return "bg-gray-50 text-gray-800";
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* 탭 메뉴 */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <nav className="flex">
          {[
            {
              key: "submitted",
              label: "제출한 문제",
              icon: <Send />,
              count: solvedProblems.length,
            },
            {
              key: "reviewed",
              label: "리뷰받은 문제",
              icon: <Code />,
              count: reviewedProblems.length,
            },
            {
              key: "bookmarked",
              label: "북마크한 문제",
              icon: <Bookmark />,
              count: bookmarkedProblems.length,
            },
          ].map(({ key, label, icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 ${
                activeTab === key
                  ? "border-indigo-500 text-indigo-600 bg-white shadow-sm"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center gap-2">
                {icon}
                {label} ({count})
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="p-6">
        {activeTab === "submitted" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {solvedProblems.map((problem, index) => (
              <div
                key={problem.submittedProblemId ?? `${problem.title}-${index}`}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-1">
                    {problem.title}
                  </h4>
                  <span className="px-2 py-1 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-700 border border-indigo-200">
                    Lv. {problem.level}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-1 rounded-md font-medium ${getLanguageColor(problem.language)}`}
                  >
                    {problem.language}
                  </span>
                  <span className="text-gray-500 font-medium">
                    {problem.submittedDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviewed" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {reviewedProblems.map((problem) => (
              <div
                key={problem.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    문제 번호: {problem.problemNum}
                  </h4>
                  <span className="px-2 py-1 rounded-lg text-xs font-bold border bg-blue-100 text-blue-700 shadow-sm">
                    {problem.language}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {problem.summary}
                </p>
                <div className="text-xs text-gray-500 font-medium">
                  리뷰 일자:{" "}
                  {new Date(problem.createdAt).toLocaleDateString("ko-KR")}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "bookmarked" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bookmarkedProblems.map((problem) => (
              <div
                key={problem.problemId}
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {problem.title}
                  </h4>
                  <div className="text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.063 4.185a.563.563 0 00.424.307l4.605.669a.563.563 0 01.312.96l-3.33 3.245a.563.563 0 00-.162.498l.786 4.582a.563.563 0 01-.818.593l-4.115-2.163a.563.563 0 00-.523 0l-4.115 2.163a.563.563 0 01-.818-.593l.786-4.582a.563.563 0 00-.162-.498l-3.33-3.245a.563.563 0 01.312-.96l4.605-.669a.563.563 0 00.424-.307l2.063-4.185z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{problem.problemId}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
