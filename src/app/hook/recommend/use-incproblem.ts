import { useQuery } from "react-query";
import { IncProblem } from "../../_types/recommend";
import { getIncProblems } from "../../_api/recommend/get-incproblems";

export const useIncProblems = (userId: number) => {
  return useQuery<IncProblem[]>({
    queryKey: ["incProblems", userId],
    queryFn: () => getIncProblems(userId),
    enabled: !!userId,
  });
};
