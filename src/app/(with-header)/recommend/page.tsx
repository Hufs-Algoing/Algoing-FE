/* eslint-disable @typescript-eslint/no-explicit-any */
//app/(with-header)/recommend/page.tsx
import RecommendationContent from "./components/recommend-content";

// SSG 비활성화
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ username?: string }>;
}

export default function RecommendPage({ searchParams }: PageProps) {
  return <RecommendationContent searchParams={searchParams} />;
}
