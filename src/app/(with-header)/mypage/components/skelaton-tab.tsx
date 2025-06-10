export default function SkeletonTabs() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 rounded-full bg-gray-200 animate-pulse"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-36 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
