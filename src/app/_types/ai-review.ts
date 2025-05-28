export interface AIReview {
  id: number;
  title: string;
  date: string;
  status: "completed" | "in-progress" | "failed";
  difficulty?: number;
  tags?: string[];
  baekjoonTier?: string;
  problemNumber?: string;
  algorithmType?: string;
  isHighlighted?: boolean;
  timeComplexity?: string;
  spaceComplexity?: string;
}
