import { getAllRecommendations } from "@/app/_api/recommend/get-all";
import { useQuery } from "@tanstack/react-query";

export const useAllRecommendations = (userId: number) => {
  return useQuery({
    queryKey: ["recommend-all", userId],
    queryFn: () => getAllRecommendations(userId),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });
};
