import axiosInstance from "@/app/_api/instance";

interface ToggleBookmarkResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: boolean;
}
// apiPatch로 하니까 인자 갯수 초과 오류가 나서 일단 axiosInstance로 할게요
export const toggleBookmark = async (userId: number, problemId: number) => {
  const res = await axiosInstance.patch<ToggleBookmarkResponse>(
    "/user/toggle",
    null,
    {
      params: { userId, problemId },
    }
  );
  return res.data;
};
