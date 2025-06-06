import axios from "axios";

const API_BASE_URL = "https://api.al-going.com";

export interface SubmitRequest {
  userId: number;
  problemNum: number;
  language: string;
  code: string;
}

export const problemSubmit = async (payload: SubmitRequest) => {
  const response = await axios.post(`${API_BASE_URL}/api/submit`, payload);
  return response.data;
};
