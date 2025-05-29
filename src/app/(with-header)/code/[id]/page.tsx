"use client";

import { useState } from "react";
import CodeEditor from "@/app/(with-header)/code/components/code/CodeEditor";
import CodeHeader from "@/app/(with-header)/code/components/code/CodeHeader";
import Footer from "@/app/(with-header)/code/components/code/Footer";
import CodeReview from "@/app/(with-header)/code/components/code/CodeReview";
import ProblemInfo from "@/app/(with-header)/code/components/code/ProblemInfo";

export default function Code() {
  const [showReview, setShowReview] = useState(false);

  const handleSubmitForReview = () => {
    setShowReview(true);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <CodeHeader />

      <div className="flex flex-1 overflow-hidden">
        {showReview ? (
          <CodeReview onClose={() => setShowReview(false)} />
        ) : (
          <ProblemInfo />
        )}

        <main className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex-1 p-4">
            <div className="flex justify-between items-center mb-2">
              <select className="border rounded px-2 py-1">
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
              </select>

              <div className="flex gap-2">
                <button>코드 초기화</button>
                <button>다크 모드</button>
              </div>
            </div>

            <div className="border rounded">
              <CodeEditor />
            </div>
          </div>

          <div className="border-t">
            <button className="h-[60px] border border-1 border-neutral-800 text-black px-4 py-2 rounded">
              실행 결과
            </button>

            <div className="h-60 border rounded p-2">
              <p>...</p>
            </div>
          </div>
        </main>
      </div>
      <Footer onSubmitForReview={handleSubmitForReview} />
    </div>
  );
}
