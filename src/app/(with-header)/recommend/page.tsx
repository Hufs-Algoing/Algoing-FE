import { getAllRecommendations } from "@/app/_api/recommend/get-all";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import RecommendationContent from "./components/recommend-content";

export default async function RecommendationPage() {
  const userId = 3;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["recommend-all", userId],
    queryFn: () => getAllRecommendations(userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecommendationContent />
    </HydrationBoundary>
  );
}
