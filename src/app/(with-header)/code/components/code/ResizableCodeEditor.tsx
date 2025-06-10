"use client";

import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Play,
  Copy,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";

interface ExecutionResult {
  message: string;
  correct: boolean;
  executionTime?: number;
  memoryUsage?: number;
  testCases?: {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
  }[];
}

interface CodeEditorProps {
  code: string;
  setCode: (value: string) => void;
  language?: string;
  executionResult?: ExecutionResult | null;
  isExecuting?: boolean;
  onExecute?: () => void;
}

export default function ResizableCodeEditor({
  code,
  setCode,
  language,
  executionResult,
  isExecuting = false,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [activeTab, setActiveTab] = useState<"output" | "testcases">("output");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newHeight = e.clientY - containerRect.top;
      if (newHeight >= 200 && newHeight <= 800) {
        setEditorHeight(newHeight);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const getStatusIcon = () => {
    if (isExecuting) {
      return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
    }
    if (!executionResult) {
      return <Play className="w-4 h-4 text-gray-400" />;
    }
    if (executionResult.correct) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusText = () => {
    if (isExecuting) return "실행 중...";
    if (!executionResult) return "실행 대기";
    return executionResult.correct ? "성공" : "실패";
  };

  const getStatusColor = () => {
    if (isExecuting) return "text-blue-600 bg-blue-50 border-blue-200";
    if (!executionResult) return "text-gray-600 bg-gray-50 border-gray-200";
    return executionResult.correct
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-red-600 bg-red-50 border-red-200";
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("코드가 클립보드에 복사되었습니다.");
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language === "javascript" ? "js" : language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("코드가 다운로드되었습니다.");
  };

  return (
    <div
      ref={containerRef}
      className="w-full border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"
    >
      {/* 코드 에디터 */}
      <div className="relative">
        <Editor
          height={editorHeight}
          defaultLanguage={language}
          value={code}
          theme="vs-dark"
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
            },
            automaticLayout: true,
            wordWrap: "on",
            tabSize: 2,
          }}
        />

        {/* 에디터 상단 버튼들 */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleCopyCode}
            className="p-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded text-xs flex items-center gap-1 transition-colors"
            title="코드 복사"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button
            onClick={handleDownloadCode}
            className="p-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded text-xs flex items-center gap-1 transition-colors"
            title="코드 다운로드"
          >
            <Download className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 리사이저 */}
      <div
        onMouseDown={() => setIsResizing(true)}
        className="h-2 bg-gray-200 cursor-row-resize hover:bg-gray-300 transition-colors flex items-center justify-center"
      >
        <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
      </div>

      {/* 탭 헤더 */}
      <div className="flex border-t bg-gray-50 text-sm font-medium text-gray-700">
        <button
          onClick={() => setActiveTab("output")}
          className={`px-4 py-2 border-r flex items-center gap-2 transition-colors ${
            activeTab === "output"
              ? "bg-white border-b-2 border-purple-500 text-purple-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          {getStatusIcon()}
          실행 결과
        </button>
        {executionResult?.testCases && (
          <button
            onClick={() => setActiveTab("testcases")}
            className={`px-4 py-2 border-r transition-colors ${
              activeTab === "testcases"
                ? "bg-white border-b-2 border-purple-500 text-purple-600"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            테스트 케이스 (
            {executionResult.testCases.filter((tc) => tc.passed).length}/
            {executionResult.testCases.length})
          </button>
        )}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="h-60 overflow-y-auto bg-white">
        {activeTab === "output" && (
          <div className="p-4">
            {isExecuting ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-purple-500 animate-spin mx-auto mb-2" />
                  <p className="text-gray-600">코드를 실행하고 있습니다...</p>
                </div>
              </div>
            ) : executionResult ? (
              <div className="space-y-4">
                {/* 실행 상태 */}
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor()}`}
                >
                  {getStatusIcon()}
                  {getStatusText()}
                </div>

                {/* 실행 결과 메시지 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">실행 결과</h4>
                  <div
                    className={`text-sm ${executionResult.correct ? "text-green-700" : "text-red-700"}`}
                  >
                    {executionResult.message}
                  </div>
                </div>

                {/* 성능 정보 */}
                {(executionResult.executionTime ||
                  executionResult.memoryUsage) && (
                  <div className="grid grid-cols-2 gap-4">
                    {executionResult.executionTime && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="text-xs text-purple-600 font-medium">
                          실행 시간
                        </div>
                        <div className="text-lg font-bold text-purple-700">
                          {executionResult.executionTime}ms
                        </div>
                      </div>
                    )}
                    {executionResult.memoryUsage && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="text-xs text-purple-600 font-medium">
                          메모리 사용량
                        </div>
                        <div className="text-lg font-bold text-purple-700">
                          {executionResult.memoryUsage}MB
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 에러 상세 정보 */}
                {!executionResult.correct && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-900 mb-1">
                          오류 상세
                        </h4>
                        <p className="text-sm text-red-700 whitespace-pre-wrap">
                          {executionResult.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Play className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>코드를 실행하여 결과를 확인하세요</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "testcases" && executionResult?.testCases && (
          <div className="p-4 space-y-4">
            <h4 className="font-medium text-gray-900">테스트 케이스 결과</h4>
            {executionResult.testCases.map((testCase, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${
                  testCase.passed
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {testCase.passed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="font-medium text-sm">
                    테스트 케이스 {index + 1}{" "}
                    {testCase.passed ? "통과" : "실패"}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-medium text-gray-700">입력:</span>
                    <pre className="mt-1 p-2 bg-gray-100 rounded text-gray-800 overflow-x-auto">
                      {testCase.input}
                    </pre>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      예상 출력:
                    </span>
                    <pre className="mt-1 p-2 bg-gray-100 rounded text-gray-800 overflow-x-auto">
                      {testCase.expectedOutput}
                    </pre>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      실제 출력:
                    </span>
                    <pre
                      className={`mt-1 p-2 rounded text-gray-800 overflow-x-auto ${
                        testCase.passed ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {testCase.actualOutput}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
