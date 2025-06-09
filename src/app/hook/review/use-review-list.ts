import {
  getReviewedList,
  ReviewedProblem,
} from "@/app/_api/review/get-review-list";
import { useQuery } from "@tanstack/react-query";

export const useReviewedProblems = (userId: number) => {
  return useQuery<ReviewedProblem[]>({
    queryKey: ["reviewed-problems", userId],
    queryFn: async () => {
      const data = await getReviewedList(userId);
      return data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ); // 최신순 정렬
    },
    enabled: !!userId,
  });
};
