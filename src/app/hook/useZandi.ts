// hooks/useZandi.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../_api/methods";
export interface ContributionDay {
  date: string;
  count: number;
}

export const useZandi = () => {
  return useQuery<ContributionDay[]>({
    queryKey: ["zandi"],
    queryFn: async () => {
      return await apiGet<ContributionDay[]>("/myinfo/zandi");
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
