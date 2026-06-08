import { JobCardProps } from "@/components/domain/Jobs/Board/JobBoard/JobBoard.types";
import { formatDate } from "@/utils/formatDate";
import { getCompanyBadge } from "@/utils/getCompanyBadge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function JobCard({ job, isWishlist, onClick }: JobCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: job.uuid,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all cursor-pointer relative group"
    >
      <h4 className="font-bold text-[13px] text-slate-800 leading-snug pr-6">
        {job.position}
      </h4>

      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {job.company}
          </p>

          <p className="text-[11px] text-slate-400 mt-0.5">
            {job.applicationDate
              ? `Aplicada em ${formatDate(job.applicationDate)}`
              : "Sem data definida"}
          </p>
        </div>

        <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 bg-slate-100 text-slate-700">
          {getCompanyBadge(job.company)}
        </div>
      </div>

      {job.notes && (
        <p className="text-[11px] text-slate-500 mt-3 line-clamp-2">
          {job.notes}
        </p>
      )}

      {isWishlist && (
        <span className="absolute top-4 right-4 text-blue-500 text-xs">
          🔖
        </span>
      )}

      {job.vacancyUrl && (
        <a
          href={job.vacancyUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-indigo-600 hover:underline mt-2 inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          Ver vaga
        </a>
      )}
    </div>
  );
}