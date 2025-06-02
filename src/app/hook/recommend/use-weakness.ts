import { useQuery } from "react-query";
import { getWeaknessProblems } from "../../apis/recommend/get-weakness-problems";

export const useWeaknessProblems = (userId: number) => {
  return useQuery({
    queryKey: ["weaknessProblems", userId],
    queryFn: () => getWeaknessProblems(userId),
  });
};
