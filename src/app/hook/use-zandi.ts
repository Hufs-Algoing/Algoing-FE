"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../_api/methods";

export interface ContributionDay {
  date: string;
  count: number;
}
export const useZandi = (userId: number) => {
  return useQuery<ContributionDay[]>({
    queryKey: ["zandi", userId],
    queryFn: async () => {
      const response = await apiGet(`/myinfo/${userId}/zandi`);

      // response 자체가 배열인 경우 → 배열 리턴
      if (Array.isArray(response)) return response;

      return [];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
