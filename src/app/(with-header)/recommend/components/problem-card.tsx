import type { FC } from "react";

interface ProblemCardProps {
  id: number;
  title: string;
  level: number;
  tags: string[];
  isSolved: boolean;
}

const ProblemCard: FC<ProblemCardProps> = ({
  id,
  title,
  level,
  tags,
  isSolved,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-md">
          <span className="text-indigo-700 font-semibold text-sm">{level}</span>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2"
            >
              # {tag}
            </span>
          ))}
        </div>
      )}
      {isSolved && <div className="mt-2 text-xs text-green-600">✓ 해결됨</div>}
    </div>
  );
};

export default ProblemCard;
