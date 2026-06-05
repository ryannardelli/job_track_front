import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { JobCard } from "@/components/domain/Jobs/JobCard";
import { KanbanColumnProps } from "@/components/domain/Jobs/Board/KanbanColumn/KanbanColumn.types";

export function KanbanColumn({
  column,
}: KanbanColumnProps) {
  return (
    <div className="w-[290px] bg-slate-100/70 rounded-xl p-3 flex flex-col shrink-0 h-full max-h-full">
      
      <div className="flex items-center justify-between mb-3 px-1 shrink-0">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${column.color}`}
          />

          <span className="font-bold text-sm text-slate-800">
            {column.title}
          </span>
        </div>

        <span className="bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
          {column.cards.length}
        </span>
      </div>

      <SortableContext
        items={column.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
          {column.cards.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isWishlist={column.title === "Wishlist"}
            />
          ))}
        </div>
      </SortableContext>

      <button className="mt-3 w-full py-2 bg-transparent border border-dashed border-slate-300 rounded-lg text-xs font-medium text-slate-500 hover:bg-white hover:text-blue-600 hover:border-blue-300 transition-all shrink-0">
        + Adicionar vaga
      </button>
    </div>
  );
}