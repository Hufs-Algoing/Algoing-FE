"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInsertBOJ } from "@/app/hook/login/use-insertBoj";
import {
  Loader2,
  User,
  Lock,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Code,
  Trophy,
  Target,
} from "lucide-react";

export default function ProfileForm() {
  const [baekjoonId, setBaekjoonId] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const router = useRouter();

  const { mutate: submitBOJ, isPending } = useInsertBOJ({
    onSuccess: () => {
      router.push("/main");
    },
    onError: () => {
      // 에러 처리는 hook에서 toast로 처리
    },
  });

  const isFormValid = baekjoonId.length >= 3 && password.length >= 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* 떠다니는 아이콘들 */}
      <div className="absolute inset-0 pointer-events-none">
        <Code className="absolute top-20 left-20 w-6 h-6 text-purple-300 opacity-30 animate-bounce delay-300" />
        <Trophy className="absolute top-32 right-32 w-8 h-8 text-yellow-300 opacity-40 animate-bounce delay-700" />
        <Target className="absolute bottom-32 left-32 w-7 h-7 text-blue-300 opacity-35 animate-bounce delay-1000" />
        <Sparkles className="absolute bottom-20 right-20 w-5 h-5 text-pink-300 opacity-30 animate-bounce delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* 메인 카드 */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-3">
              프로필 설정
            </h1>
            <p className="text-purple-200/80 text-lg">
              알고잉과 함께 코딩 여정을 시작해보세요
            </p>
          </div>

          {/* 폼 */}
          <div className="space-y-6">
            {/* 백준 아이디 입력 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-purple-200 mb-2">
                백준 아이디
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity ${
                    focusedField === "baekjoon" ? "opacity-40" : ""
                  }`}
                ></div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <input
                    type="text"
                    maxLength={20}
                    value={baekjoonId}
                    onChange={(e) => setBaekjoonId(e.target.value)}
                    onFocus={() => setFocusedField("baekjoon")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="백준 아이디를 입력하세요"
                    className="w-full pl-12 pr-16 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-sm text-purple-300/60">
                      {baekjoonId.length}/20
                    </span>
                    {baekjoonId.length >= 3 && (
                      <CheckCircle className="w-4 h-4 text-green-400 animate-scale-in" />
                    )}
                  </div>
                </div>
              </div>
              {baekjoonId.length > 0 && baekjoonId.length < 3 && (
                <div className="flex items-center gap-2 text-amber-300 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span>아이디는 3자 이상이어야 합니다</span>
                </div>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-purple-200 mb-2">
                비밀번호
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity ${
                    focusedField === "password" ? "opacity-40" : ""
                  }`}
                ></div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <input
                    type="password"
                    maxLength={16}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full pl-12 pr-16 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-sm text-purple-300/60">
                      {password.length}/16
                    </span>
                    {password.length >= 6 && (
                      <CheckCircle className="w-4 h-4 text-green-400 animate-scale-in" />
                    )}
                  </div>
                </div>
              </div>
              {password.length > 0 && password.length < 6 && (
                <div className="flex items-center gap-2 text-amber-300 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span>비밀번호는 6자 이상이어야 합니다</span>
                </div>
              )}
            </div>

            {/* 진행률 표시 */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-200">
                  설정 진행률
                </span>
                <span className="text-sm text-purple-300">
                  {isFormValid
                    ? "100%"
                    : `${Math.round(((baekjoonId.length >= 3 ? 1 : 0) + (password.length >= 6 ? 1 : 0)) * 50)}%`}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${isFormValid ? 100 : ((baekjoonId.length >= 3 ? 1 : 0) + (password.length >= 6 ? 1 : 0)) * 50}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <button
              onClick={() =>
                submitBOJ({
                  bojId: baekjoonId,
                  bojPassword: password,
                })
              }
              disabled={!isFormValid || isPending}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden group ${
                isFormValid && !isPending
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-500/30 text-gray-400 cursor-not-allowed"
              }`}
            >
              {/* 버튼 배경 효과 */}
              {isFormValid && !isPending && (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}

              <div className="relative flex items-center justify-center gap-3">
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>저장 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>알고잉 시작하기</span>
                  </>
                )}
              </div>
            </button>

            {/* 추가 정보 */}
            <div className="text-center pt-4">
              <p className="text-purple-300/60 text-sm">
                백준 계정 정보는 문제 추천을 위해서만 사용됩니다
              </p>
            </div>
          </div>
        </div>

        {/* 하단 장식 */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-purple-300/60 text-sm">
            <Code className="w-4 h-4" />
            <span>Powered by AlgoIng</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
