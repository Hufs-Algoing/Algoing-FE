import axios from "axios";

const API_BASE_URL = "https://api.al-going.com";

export interface WeaknessProblem {
  problemId: number;
  title: string;
  tag: string;
  finalScore: number;
}

export interface WeaknessResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: WeaknessProblem[];
}

export const getWeaknessProblems = async (userId: number) => {
  const res = await axios.get<WeaknessResponse>(
    `${API_BASE_URL}/api/recommend/weakness/${userId}`
  );
  return res.data.result;
};
