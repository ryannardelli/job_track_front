import { JobCard } from "@/components/domain/Jobs/JobCard";

export function KanbanColumn({ column }) {
  return (
    <div className="w-[290px] bg-slate-100/70 rounded-xl p-3 flex flex-col shrink-0 h-full">

      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
          <span className="font-bold text-sm">
            {column.title}
          </span>
        </div>

        <span>
          {column.count}
        </span>
      </div>

      <div className="space-y-2.5 overflow-y-auto flex-1">
        {column.cards.map((job) => (
          <JobCard
            key={`${job.company}-${job.role}`}
            job={job}
            isWishlist={column.title === "Wishlist"}
          />
        ))}
      </div>

      <button>
        + Adicionar vaga
      </button>
    </div>
  );
}