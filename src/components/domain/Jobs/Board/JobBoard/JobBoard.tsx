import { KanbanColumn } from "@/components/domain/Jobs/Board/KanbanColumn";
import { columns } from "@/components/domain/Jobs/Board/mocks/column";

import { DndContext } from "@dnd-kit/core";

export function JobBoard() {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("Arrastou:", active.id);
    console.log("Soltou em:", over?.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto">
        {columns.map((column) => (
          <KanbanColumn
            key={column.title}
            column={column}
          />
        ))}
      </div>
    </DndContext>
  );
}