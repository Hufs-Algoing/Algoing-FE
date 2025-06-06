// app/hook/login/use-insertBoj.ts
import { useMutation } from "@tanstack/react-query";
import { postBOJ, BOJInfo } from "@/app/_api/login/bojLogin";

export const useInsertBOJ = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (data: BOJInfo) => postBOJ(data),
    onSuccess,
    onError,
  });
};
