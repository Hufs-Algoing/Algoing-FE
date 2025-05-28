export interface UserData {
  name: string;
  level: number;
  profileImage: string;
  stats: {
    solved: number;
    attempted: number;
    reviewed: number;
  };
  streak: number;
  totalPoints: number;
}

export interface SolvedProblem {
  id: number;
  title: string;
  difficulty: number;
  tags: string[];
  solvedDate: string;
  language: string;
}

export interface ReviewedProblem {
  id: number;
  title: string;
  difficulty: number;
  tags: string[];
  reviewDate: string;
  reviewer: string;
  score: number;
}

export interface ActivityDatum {
  date: string;
  problems: number;
  day: string;
}
