//app/(with-header)/recommend/page.tsx
import RecommendationContent from "./components/recommend-content";

// SSG 비활성화
export const dynamic = "force-dynamic";

export default function RecommendPage() {
  return <RecommendationContent />;
}
