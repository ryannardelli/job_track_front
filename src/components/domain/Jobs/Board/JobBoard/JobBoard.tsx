import { useState } from "react";

import {
  DndContext,
  pointerWithin,
  type DragEndEvent,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";

import { KanbanColumn } from "@/components/domain/Jobs/Board/KanbanColumn";
import { columns as initialColumns } from "@/components/domain/Jobs/Board/mocks/column";

export function JobBoard() {
  const [board, setBoard] = useState(initialColumns);

  const findColumn = (id: string) => {
    if (board.some((col) => col.id === id)) {
      return board.find((col) => col.id === id);
    }
    return board.find((col) => col.cards.some((card) => card.id === id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id === overColumn.id) {
      const oldIndex = activeColumn.cards.findIndex((card) => card.id === activeId);
      const newIndex = activeColumn.cards.findIndex((card) => card.id === overId);

      setBoard((prev) =>
        prev.map((col) =>
          col.id === activeColumn.id
            ? { ...col, cards: arrayMove(col.cards, oldIndex, newIndex) }
            : col
        )
      );
    } 
    else {
      setBoard((prev) => {
        return prev.map((col) => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              cards: col.cards.filter((card) => card.id !== activeId),
            };
          }

          if (col.id === overColumn.id) {
            const grabbedCard = activeColumn.cards.find((card) => card.id === activeId);
            if (!grabbedCard) return col;

            const isOverAColumn = overColumn.id === overId;
            let newIndex = overColumn.cards.length;

            if (!isOverAColumn) {
              newIndex = overColumn.cards.findIndex((card) => card.id === overId);
            }

            const newCards = [...col.cards];
            newCards.splice(newIndex, 0, grabbedCard);

            return {
              ...col,
              cards: newCards,
            };
          }

          return col;
        });
      });
    }
  };

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {board.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </DndContext>
  );
}