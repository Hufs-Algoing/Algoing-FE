// 티어 색상 클래스 반환
export function getTierColor(tier: number): string {
  if (tier <= 5) return "bg-amber-100 text-amber-800"; // Bronze
  if (tier <= 10) return "bg-gray-100 text-gray-800"; // Silver
  if (tier <= 15) return "bg-yellow-100 text-yellow-800"; // Gold
  if (tier <= 20) return "bg-green-100 text-green-800"; // Platinum
  if (tier <= 25) return "bg-blue-100 text-blue-800"; // Diamond
  if (tier <= 30) return "bg-red-100 text-red-800"; // Ruby
  return "bg-slate-200 text-slate-700";
}
