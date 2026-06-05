import { KanbanColumn } from "@/components/domain/Jobs/Board/KanbanColumn";
import { columns } from "@/components/domain/Jobs/Board/mocks/column";

export function JobBoard() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 items-start h-[calc(100vh-240px)] min-h-[450px]">
      {columns.map((column) => (
        <KanbanColumn
          key={column.title}
          column={column}
        />
      ))}
    </div>
  );
}