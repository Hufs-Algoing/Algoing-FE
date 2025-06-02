import axios from "axios";
import { IncProblemResponse } from "../../_types/recommend";

const API_BASE_URL = "https://api.al-going.com"; 

export const getIncProblems = async (userId: number) => {
  const res = await axios.get<IncProblemResponse>(
    `${API_BASE_URL}/api/recommend/incproblem/${userId}`
  );
  return res.data.result;
};
