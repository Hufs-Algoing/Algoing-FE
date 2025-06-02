"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const TypewriterText = ({
  text,
  delay = 30,
  onComplete,
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateText = useCallback(() => {
    if (currentIndex < text.length) {
      setDisplayText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  useEffect(() => {
    const timeout = setTimeout(updateText, delay);
    return () => clearTimeout(timeout);
  }, [updateText, delay]);

  return <span>{displayText}</span>;
};

interface CodeReviewProps {
  onClose: () => void;
}

export default function CodeReview({ onClose }: CodeReviewProps) {
  const [typingStep, setTypingStep] = useState(0);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [reviewComplete, setReviewComplete] = useState(false);

  const handleStepComplete = () => {
    setTypingStep((prev) => prev + 1);
  };

  useEffect(() => {
    // Start typing after component mounts
    const timer = setTimeout(() => {
      setTypingStep(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show save dialog when review is complete
    if (typingStep >= 9) {
      setReviewComplete(true);
      const timer = setTimeout(() => {
        setShowSaveDialog(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [typingStep]);

  const handleSave = () => {
    setShowSaveDialog(false);
    // Add save logic here
    console.log("Review saved!");
    // You can add a success toast here if needed
  };

  const handleDiscard = () => {
    setShowSaveDialog(false);
    onClose();
  };

  return (
    <>
      <aside className="w-2/5 py-6 border-r overflow-y-auto px-12 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm">🤖</span>
            </div>
            <h2 className="text-xl font-semibold">알고잉</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white">🤖</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-4">
                {/* 최적화 섹션 */}
                <div className="mb-6">
                  {typingStep >= 1 && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🔧</span>
                      <h3 className="text-lg font-semibold">
                        <TypewriterText
                          text="최적화 (Optimization)"
                          delay={50}
                          onComplete={handleStepComplete}
                        />
                      </h3>
                    </div>
                  )}

                  {typingStep >= 2 && (
                    <ul className="space-y-3 ml-6">
                      <li className="flex items-start gap-2">
                        <span className="text-sm mt-1">•</span>
                        <span className="text-sm text-gray-700">
                          <TypewriterText
                            text="size와 color를 문자열로 받아 사용하는 부분은 런타임에서 타입 오류가 발생할 수 있다. 컴파일 타임에서 잡히도록 union type으로 제한하는 게 좋겠어요."
                            delay={20}
                            onComplete={handleStepComplete}
                          />
                        </span>
                      </li>
                      {typingStep >= 3 && (
                        <li className="flex items-start gap-2">
                          <span className="text-sm mt-1">•</span>
                          <span className="text-sm text-gray-700">
                            <TypewriterText
                              text="기본값을 함수 내부에서 할당하는 대신 구조 분해 단계에서 할당한 걸 불필요한 리렌더링을 줄이는 데 도움이 돼요."
                              delay={20}
                              onComplete={handleStepComplete}
                            />
                          </span>
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                {/* 가독성 섹션 */}
                {typingStep >= 4 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">👀</span>
                      <h3 className="text-lg font-semibold">
                        <TypewriterText
                          text="가독성 (Readability)"
                          delay={50}
                          onComplete={handleStepComplete}
                        />
                      </h3>
                    </div>

                    {typingStep >= 5 && (
                      <ul className="space-y-3 ml-6">
                        <li className="flex items-start gap-2">
                          <span className="text-sm mt-1">•</span>
                          <span className="text-sm text-gray-700">
                            <TypewriterText
                              text="className={`${size} ${color}`}는 직관적이긴 하지만, 조건이 많아질수록 복잡해지기 때문에 clsx 또는 classnames 같은 유틸을 사용하는 게 더 깔끔해요."
                              delay={20}
                              onComplete={handleStepComplete}
                            />
                          </span>
                        </li>
                        {typingStep >= 6 && (
                          <li className="flex items-start gap-2">
                            <span className="text-sm mt-1">•</span>
                            <span className="text-sm text-gray-700">
                              <TypewriterText
                                text="버튼 안에 텍스트를 하드코딩하기보단 children으로 받아서 재사용성을 높이면서도 컴포넌트 구조가 명확해져요."
                                delay={20}
                                onComplete={handleStepComplete}
                              />
                            </span>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                )}

                {/* 코드 중복성 섹션 */}
                {typingStep >= 7 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🔄</span>
                      <h3 className="text-lg font-semibold">
                        <TypewriterText
                          text="코드 중복성 (Code Duplication)"
                          delay={50}
                          onComplete={handleStepComplete}
                        />
                      </h3>
                    </div>

                    {typingStep >= 8 && (
                      <ul className="space-y-3 ml-6">
                        <li className="flex items-start gap-2">
                          <span className="text-sm mt-1">•</span>
                          <span className="text-sm text-gray-700">
                            <TypewriterText
                              text="size와 color 관련 스타일이 여러 곳에 반복될 가능성이 있으니, 공통된 ButtonStyle 또는 스타일 유틸을 만들어서 관리하면 중복 방지에 좋아요."
                              delay={20}
                              onComplete={handleStepComplete}
                            />
                          </span>
                        </li>
                        {typingStep >= 9 && (
                          <li className="flex items-start gap-2">
                            <span className="text-sm mt-1">•</span>
                            <span className="text-sm text-gray-700">
                              <TypewriterText
                                text="향후 같은 스타일을 다른 버튼에서 재사용하려면, 현재 구조는 유지보수가 어려기 때문에 공통 속성은 따로 분리해두는 게 유리해요."
                                delay={20}
                                onComplete={handleStepComplete}
                              />
                            </span>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Toast Notification */}
      <AnimatePresence>
        {showSaveDialog && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white rounded-lg shadow-lg border px-6 py-4 flex items-center gap-4">
              <span className="text-gray-800 font-medium">
                이 리뷰를 저장하시겠습니까?
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="text-2xl hover:scale-110 transition-transform"
                  title="저장"
                >
                  ✅
                </button>
                <button
                  onClick={handleDiscard}
                  className="text-2xl hover:scale-110 transition-transform"
                  title="취소"
                >
                  ❎
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
