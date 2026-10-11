export default function ProductGridSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 border-slate-300 border rounded-xl flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="skeleton size-12 rounded-xl" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="skeleton h-4 w-2/3" />
              <div className="skeleton h-3 w-1/3" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="skeleton h-6 w-24" />
            <div className="skeleton h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
