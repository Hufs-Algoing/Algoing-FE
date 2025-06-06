"use client";

import { Loader2 } from "lucide-react";

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
  };

  return (
    <Loader2
      className={`${sizes[size]} animate-spin text-indigo-600`}
      aria-label="로딩 중"
    />
  );
}

// 페이지 전체 로딩
export function PageLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
        <p className="text-lg font-medium text-indigo-600">
          페이지 불러오는 중...
        </p>
      </div>
    </div>
  );
}

// 점 로딩
export function DotsLoading() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

// 카드 스켈레톤
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}

// 문제 카드 스켈레톤
export function ProblemSkeleton() {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 rounded w-12"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

// 버튼 로딩
export function LoadingButton({ children, ...props }: any) {
  return (
    <button
      {...props}
      disabled
      className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg opacity-70 cursor-not-allowed"
    >
      <Spinner size="sm" />
      {children || "로딩 중..."}
    </button>
  );
}
