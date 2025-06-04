import { TierBasedRecommendResponse } from "@/app/_types/recommend";
import axios from "axios";

const API_BASE_URL = "https://api.al-going.com"; // 실제 도메인 사용

export const getTierBasedRecommend = async (userId: number) => {
  const res = await axios.get<TierBasedRecommendResponse>(
    `${API_BASE_URL}/api/recommend/daily/${userId}`
  );
  return res.data.result;
};
