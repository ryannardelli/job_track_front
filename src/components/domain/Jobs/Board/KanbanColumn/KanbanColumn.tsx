import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { JobCard } from "@/components/domain/Jobs/JobCard";
import { KanbanColumnProps } from "@/components/domain/Jobs/Board/KanbanColumn/KanbanColumn.types";
import { CreateJobButton } from "@/components/domain/Button/CreateJobButton/CreateJobButton";

export function KanbanColumn({ column, onCardClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-[290px] rounded-xl p-3 flex flex-col shrink-0 h-full max-h-full transition-colors
        ${isOver ? "bg-slate-200/80" : "bg-slate-100/70"}
      `}
    >
      <div className="flex items-center justify-between mb-3 px-1 shrink-0">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${column.color}`} />

          <span className="font-bold text-sm text-slate-800">
            {column.title}
          </span>
        </div>

        <span className="bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
          {column.cards.length}
        </span>
      </div>

      <SortableContext
        items={column.cards.map((card) => card.uuid)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
          {column.cards.map((job) => (
            <JobCard
              key={job.uuid}
              job={job}
              isWishlist={column.title === "Wishlist"}
              onClick={() => onCardClick(job)}
            />
          ))}
        </div>
      </SortableContext>

      <CreateJobButton />
    </div>
  );
}