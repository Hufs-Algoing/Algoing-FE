import { getAllRecommendations } from "@/app/_api/recommend/get-all";
import { useQuery } from "@tanstack/react-query";

export const useAllRecommendations = (userId: number) => {
  return useQuery({
    queryKey: ["recommend-all", userId],
    queryFn: () => getAllRecommendations(userId),
  });
};
