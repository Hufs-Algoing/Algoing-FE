export interface IntroSectionProps {
  username?: string;
  level: number;
  profileImage: string;
  stats?: {
    solved: number;
    attempted: number;
    reviewed: number;
  };
  streak: number;
  totalPoints: number;
}
export default function IntroSection({ username }: IntroSectionProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              안녕하세요, <span className="text-indigo-200">{username}</span>{" "}
              님!
            </h1>
            <p className="mt-2 text-indigo-100 max-w-2xl">
              알고리즘 실력 향상을 위한 맞춤형 문제와 코드 리뷰를 추천해
              드립니다.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="text-3xl font-bold">42</div>
                  <div className="text-xs text-indigo-200">해결한 문제</div>
                </div>
                <div className="h-10 border-r border-white/20" />
                <div className="mx-4">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-xs text-indigo-200">현재 레벨</div>
                </div>
                <div className="h-10 border-r border-white/20" />
                <div className="ml-4">
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-xs text-indigo-200">연속 학습일</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
