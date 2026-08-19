export function StageProgress({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 rounded-full bg-[#2B3630] overflow-hidden">
        <div
          className="h-full bg-[#C9932B] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] tabular-nums text-[#8A9A93]">
        {done}/{total}
      </span>
    </div>
  );
}