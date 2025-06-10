"use client";
import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            앗! 문제가 발생했어요
          </h1>
          <p className="text-gray-600 leading-relaxed">
            예상치 못한 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="bg-gray-100 rounded-lg p-4 text-left">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              에러 상세:
            </h3>
            <pre className="text-xs text-gray-600 overflow-auto max-h-32">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <RefreshCw className="w-4 h-4" />
            다시 시도하기
          </button>

          <button
            onClick={handleRefresh}
            className="w-full h-12 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:border-blue-400 hover:shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            페이지 새로고침
          </button>

          <button
            onClick={handleGoHome}
            className="w-full h-10 text-gray-500 text-sm hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
