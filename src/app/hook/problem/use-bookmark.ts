import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleBookmark } from "@/app/_api/problem/toggle-bookmark";

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      problemId,
    }: {
      userId: number;
      problemId: number;
    }) => toggleBookmark(userId, problemId),
    onSuccess: (_, { userId, problemId }) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarkStatus", userId, problemId],
      });
    },
  });
};
