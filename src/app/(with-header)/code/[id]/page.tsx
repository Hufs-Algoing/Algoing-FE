"use client";

import { useState } from "react";
import CodeEditor from "@/app/(with-header)/code/components/code/CodeEditor";
import CodeHeader from "@/app/(with-header)/code/components/code/CodeHeader";
import Footer from "@/app/(with-header)/code/components/code/Footer";
import CodeReview from "@/app/(with-header)/code/components/code/CodeReview";
import ProblemInfo from "@/app/(with-header)/code/components/code/ProblemInfo";
import { useProblemSubmit } from "@/app/hook/problem/use-problem-submit";
import { useParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import DarkModeToggle from "@/app/_components/DarkMode";
export default function Code() {
  const [showReview, setShowReview] = useState(false);
  const [language, setLanguage] = useState("node.js");
  const initialCode = "// 여기에 코드를 입력하세요";
  const [code, setCode] = useState(initialCode);

  const userId = 3; // 임시. /api/myinfo 결과로 대체 예정
  const { id } = useParams();

  const problemNum = Number(id);
  const recommendationSessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("recommendationSessionId") || ""
      : "";
  const { mutate: submitCode } = useProblemSubmit();
  const handleResetCode = () => {
    if (window.confirm("코드를 초기화하시겠습니까?")) {
      setCode(initialCode);
    }
  };
  const languageOptions = [
    "node.js",
    "Python 3",
    "C++17",
    "PyPy3",
    "C99",
    "Java 11",
    "Ruby",
    "Kotlin (JVM)",
    "Swift",
  ];
  const languageMap: Record<string, string> = {
    "node.js": "javascript",
    "Python 3": "python",
    "C++17": "cpp",
    PyPy3: "python",
    C99: "c",
    "Java 11": "java",
    Ruby: "ruby",
    "Kotlin (JVM)": "kotlin",
    Swift: "swift",
  };
  const monacoLang = languageMap[language];
  return (
    <div className="flex flex-col h-screen relative">
      <CodeHeader />

      <div className="flex flex-1 overflow-hidden">
        {showReview ? (
          <CodeReview
            onClose={() => setShowReview(false)}
            problemNum={problemNum}
            language={language}
            code={code}
          />
        ) : (
          <ProblemInfo />
        )}

        <main className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex-1 p-4">
            <div className="flex justify-between items-center mb-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border rounded px-2 py-1"
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>

              <div className="flex gap-4">
                <button onClick={handleResetCode}>
                  <RotateCcw />
                </button>

                <DarkModeToggle />
              </div>
            </div>

            <div className="border rounded">
              <CodeEditor code={code} setCode={setCode} language={monacoLang} />
            </div>
          </div>
        </main>
      </div>

      <Footer
        onSubmitForReview={() =>
          submitCode(
            {
              userId,
              problemNum,
              language,
              code,
              recommendationSessionId,
            },
            {
              onSuccess: () => {
                alert("제출 성공");
                setShowReview(true);
              },
              onError: () => {
                alert("제출 실패");
              },
            }
          )
        }
      />
    </div>
  );
}
