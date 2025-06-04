
import { useQuery } from "@tanstack/react-query";
import { getTierBasedRecommend } from "../../_api/recommend/get-daily-problems";
import { TierBasedRecommend } from "@/app/_types/recommend";

export const useTierBasedRecommend = (userId: number) => {
  return useQuery<TierBasedRecommend[], Error>({
    queryKey: ["daily-problems", userId],
    queryFn: () => getTierBasedRecommend(userId),
  });
};
