"use client";

export default function Footer() {
  return (
    <footer className="w-full fixed bottom-0 left-0  border-t bg-white py-2 px-8 flex items-center justify-between">
      {/* 왼쪽 (이전/다음 버튼) */}
      <div>
        <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-md">
          힌트 보기
        </button>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <button className="flex items-center gap-1 text-gray-700">
          <span>←</span>
          <span>이전</span>
        </button>
        <button className="flex items-center gap-1  text-gray-700">
          <span>다음</span>
          <span>→</span>
        </button>
      </div>

      {/* 오른쪽 (코드 실행 / 제출 후 저장) */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md">
          코드 실행
        </button>
        <button className="px-4 py-3 bg-[#251B5B] text-white rounded-md">
          제출 후 리뷰받기
        </button>
      </div>
    </footer>
  );
}
