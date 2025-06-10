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
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
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
        </div>
      </div>
    </div>
  );
}
