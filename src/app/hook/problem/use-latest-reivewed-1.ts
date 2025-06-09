import {
  getReviewedList,
  ReviewedProblem,
} from "@/app/_api/review/get-review-list";
import { useQuery } from "@tanstack/react-query";

export const useLatestReviewedProblem = (userId: number) => {
  return useQuery<ReviewedProblem | null>({
    queryKey: ["latest-reviewed", userId],
    queryFn: async () => {
      const list = await getReviewedList(userId);
      if (!list || list.length === 0) return null;
      return list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
    },
    enabled: !!userId,
  });
};
