export interface CodeReviewPost {
  id: number;
  title: string;
  author: string;
  authorLevel?: number;
  date: string;
  comments: number;
  isHot?: boolean;
  difficulty?: number;
  tags?: string[];
  status?: "pending" | "solved" | "in-progress";
  isBookmarked?: boolean;
  hasAttachment?: boolean;
  hasCode?: boolean;
  isFeatured?: boolean;
  previewText?: string;
}
