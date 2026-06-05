import { JobCardProps } from "@/components/domain/Jobs/Board/JobBoard/JobBoard.types";

export function JobCard({
  job,
  isWishlist,
  onClick,
}: JobCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all cursor-pointer relative group"
    >
      <h4 className="font-bold text-[13px] text-slate-800 leading-snug pr-6">
        {job.role}
      </h4>

      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {job.company}
          </p>

          <p className="text-[11px] text-slate-400 mt-0.5">
            {job.info}
          </p>
        </div>

        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${job.badgeBg}`}
        >
          {job.badge}
        </div>
      </div>

      {isWishlist && (
        <span className="absolute top-4 right-4 text-blue-500 text-xs">
          🔖
        </span>
      )}
    </div>
  );
}