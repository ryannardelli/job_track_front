import { StatsCardProps } from "@/components/domain/Jobs/StatsCard/StatsCard.type";

export function StatsCard({
  label,
  value,
  sub,
  icon,
  bgColor,
}: StatsCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </p>

        <p className="text-2xl font-bold text-slate-800 mt-1">
          {value}
        </p>

        <p className="text-xs text-slate-400 mt-0.5">
          {sub}
        </p>
      </div>

      <div
        className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center text-lg`}
      >
        {icon}
      </div>
    </div>
  );
}