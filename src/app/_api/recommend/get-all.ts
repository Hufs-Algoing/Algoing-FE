import { AllRecommendationsResponse } from "@/app/_types/recommend";
import { apiGet } from "../methods";

export const getAllRecommendations = async (userId: number) => {
  return apiGet<AllRecommendationsResponse>(`/recommend/all/${userId}`);
};
