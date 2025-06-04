import { useQuery } from "@tanstack/react-query";
import { getWeaknessProblems } from "../../_api/recommend/get-weakness-problems";

export const useWeaknessProblems = (userId: number) => {
  return useQuery({
    queryKey: ["weaknessProblems", userId],
    queryFn: () => getWeaknessProblems(userId),
  });
};
