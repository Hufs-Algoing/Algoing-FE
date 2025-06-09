"use client";

import { useState } from "react";
import { Send, Bookmark, X, ExternalLink, Copy, Check } from "lucide-react";

interface ProblemTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  solvedProblems: any[];
  reviewedProblems: any[];
  bookmarkedProblems: any[];
}

const getLanguageColor = (language: string) => {
  switch (language?.toLowerCase()) {
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
  bookmarkedProblems,
}: ProblemTabsProps) {
  const [selectedProblem, setSelectedProblem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // 문제 ID 기준으로 그룹화
  interface GroupedProblem {
    title: string;
    level: number;
    language: string;
    submittedDate: string;
    submittedProblemId?: string;
    submissions: any[];
    submissionCount: number;
    problemId?: number;
    answer?: string;
  }

  const groupedProblems: Record<string, GroupedProblem> = solvedProblems.reduce(
    (acc, problem) => {
      const problemId =
        problem.problemId || problem.title || `unknown-${Math.random()}`;
      if (!acc[problemId]) {
        acc[problemId] = {
          ...problem,
          submissions: [problem],
          submissionCount: 1,
        };
      } else {
        acc[problemId].submissions.push(problem);
        acc[problemId].submissionCount += 1;

        if (
          new Date(problem.submittedDate) >
          new Date(acc[problemId].submittedDate)
        ) {
          acc[problemId] = {
            ...problem,
            submissions: acc[problemId].submissions,
            submissionCount: acc[problemId].submissionCount,
          };
        }
      }
      return acc;
    },
    {}
  );

  const groupProblems: GroupedProblem[] = Object.values(groupedProblems);

  const openModal = (problem: any) => {
    if (!problem) {
      alert("문제 정보를 찾을 수 없습니다.");
      return;
    }

    setSelectedProblem({
      title: problem.title,
      level: problem.level,
      language: problem.language,
      submittedDate: problem.submittedDate,
      description: problem.description ?? "",
      code: problem.answer || "",
      submittedProblemId: problem.submittedProblemId,
      url: `https://www.acmicpc.net/problem/${problem.problemId}`,
      submissions: problem.submissions || [problem],
      submissionCount: problem.submissionCount || 1,
      currentSubmissionIndex: 0,
    });

    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ""; // 모달 닫힐 때 스크롤 복원
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* 탭 메뉴 */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <nav className="flex">
            {[
              {
                key: "submitted",
                label: "제출한 문제",
                icon: <Send className="w-4 h-4" />,
                count: solvedProblems.length,
              },

              {
                key: "bookmarked",
                label: "북마크한 문제",
                icon: <Bookmark className="w-4 h-4" />,
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
              {groupProblems.map((problem, index) => (
                <div
                  key={
                    problem.submittedProblemId ?? `${problem.title}-${index}`
                  }
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group cursor-pointer"
                  onClick={() => openModal(problem)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
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
                    <div className="flex items-center gap-1">
                      {problem.submissionCount > 1 && (
                        <span className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-700">
                          {problem.submissionCount}회 제출
                        </span>
                      )}
                      <span className="text-gray-500 font-medium">
                        {problem.submittedDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "bookmarked" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {bookmarkedProblems.map((problem) => (
                <a
                  key={problem.problemId}
                  href={`https://www.acmicpc.net/problem/${problem.problemId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 border border-gray-200 group cursor-pointer"
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
                  <div className="text-sm text-gray-500">
                    {problem.problemId}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && selectedProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-transparent"
            onClick={closeModal}
            aria-hidden="true"
          ></div>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-700 border border-indigo-200">
                    Lv. {selectedProblem.level}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${getLanguageColor(selectedProblem.language)}`}
                  >
                    {selectedProblem.language}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {selectedProblem.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  제출일: {selectedProblem.submittedDate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={closeModal}
                  aria-label="닫기"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* 모달 내용 */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {selectedProblem.submissions &&
                selectedProblem.submissions.length > 1 && (
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-md font-medium text-gray-700">
                      총 {selectedProblem.submissionCount}회 제출
                    </h4>
                    <div className="flex gap-2">
                      {selectedProblem.submissions.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setSelectedProblem({
                              ...selectedProblem,
                              currentSubmissionIndex: idx,
                              code:
                                selectedProblem.submissions[idx].answer || "",
                              submittedDate:
                                selectedProblem.submissions[idx].submittedDate,
                              language:
                                selectedProblem.submissions[idx].language,
                            })
                          }
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            selectedProblem.currentSubmissionIndex === idx
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    제출한 코드
                    {selectedProblem.submissions &&
                      selectedProblem.submissions.length > 1 && (
                        <span className="text-sm font-normal text-gray-500">
                          ({selectedProblem.currentSubmissionIndex + 1}번째
                          제출)
                        </span>
                      )}
                  </h4>
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                    onClick={() => copyToClipboard(selectedProblem.code)}
                  >
                    {copied ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    {copied ? "복사됨" : "복사"}
                  </button>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-gray-100 font-mono text-sm">
                    <code>{selectedProblem.code}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-500">
                {selectedProblem.submissions &&
                selectedProblem.submissions.length > 1
                  ? `${selectedProblem.currentSubmissionIndex + 1}번째 제출 | ${selectedProblem.submissions[selectedProblem.currentSubmissionIndex].submittedDate}`
                  : selectedProblem.submittedProblemId
                    ? `제출 ID: ${selectedProblem.submittedProblemId}`
                    : ""}
              </div>
              {selectedProblem.url && (
                <a
                  href={selectedProblem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  문제 보기
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
