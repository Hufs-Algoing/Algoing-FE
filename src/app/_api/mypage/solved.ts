import { apiGet } from "../methods";

export interface SolvedProblem {
  submittedProblemId: string;
  userId: number;
  problemId: number;
  title: string;
  answer: string;
  tag: string;
  level: number;
  language: string;
  submittedAt: string;
  submittedDate: string;
}

export const fetchSolvedProblems = (userId: number) => {
  return apiGet<SolvedProblem[]>(`/user/${userId}/solved`);
};
