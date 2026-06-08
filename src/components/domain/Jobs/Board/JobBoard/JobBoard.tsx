import { useEffect, useState } from "react";

import {
  DndContext,
  pointerWithin,
  type DragEndEvent,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import { KanbanColumn } from "@/components/domain/Jobs/Board/KanbanColumn";
import { useApplications } from "@/hooks/useApplications";
import { BoardFromApi } from "@/components/domain/Jobs/Board/JobBoard/types/BoardFromApi";
import { Column } from "@/components/domain/Jobs/Board/JobBoard/types/Column";
import { ApplicationDetailsModal } from "@/components/domain/Jobs/Board/ApplicationDetailsModal";

export function JobBoard() {
  const { stateApplication, updateStatus } = useApplications();
  console.log(stateApplication.board);

  const boardFromApi: BoardFromApi | null = stateApplication.board;

  const [board, setBoard] = useState<Column[]>([]);

    const [selectedApplication, setSelectedApplication] = useState<any | null>(
    null
  );

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleOpenDetails = (application: any) => {
      setSelectedApplication(application);
      setIsDetailsOpen(true);
    };

    const handleCloseDetails = () => {
      setIsDetailsOpen(false);
      setSelectedApplication(null);
    };

  const statusMap = {
      wishlist: "WISHLIST",
      applied: "APPLIED",
      interview: "INTERVIEW",
      offer: "OFFER",
      rejected: "REJECTED",
    } as const;

  useEffect(() => {
    if (!boardFromApi) return;

    setBoard([
      {
        id: "wishlist",
        title: "Wishlist",
        color: "bg-blue-600",
        cards: boardFromApi.WISHLIST || [],
      },
      {
        id: "applied",
        title: "Aplicadas",
        color: "bg-amber-500",
        cards: boardFromApi.APPLIED || [],
      },
      {
        id: "interview",
        title: "Entrevistas",
        color: "bg-purple-600",
        cards: boardFromApi.INTERVIEW || [],
      },
      {
        id: "offer",
        title: "Propostas",
        color: "bg-green-600",
        cards: boardFromApi.OFFER || [],
      },
      {
        id: "rejected",
        title: "Rejeitadas",
        color: "bg-red-500",
        cards: boardFromApi.REJECTED || [],
      },
    ]);
  }, [boardFromApi]);

  const findColumn = (id: string) => {
    if (board.some((col) => col.id === id)) {
      return board.find((col) => col.id === id);
    }

    return board.find((col) =>
      col.cards.some((card) => card.uuid === id)
    );
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id === overColumn.id) {
      const oldIndex = activeColumn.cards.findIndex(
        (card) => card.uuid === activeId
      );
      const newIndex = activeColumn.cards.findIndex(
        (card) => card.uuid === overId
      );

      setBoard((prev) =>
        prev.map((col) =>
          col.id === activeColumn.id
            ? {
                ...col,
                cards: arrayMove(col.cards, oldIndex, newIndex),
              }
            : col
        )
      );
    } 

    else {
      const movedCard = activeColumn.cards.find(
        (card) => card.uuid === activeId
      );

      if (!movedCard) return;

      const newStatus = statusMap[overColumn.id as keyof typeof statusMap];

      setBoard((prev) =>
        prev.map((col) => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              cards: col.cards.filter((c) => c.uuid !== activeId),
            };
          }

          if (col.id === overColumn.id) {
            return {
              ...col,
              cards: [...col.cards, { ...movedCard, status: newStatus as any }],
            };
          }

          return col;
        })
      );

      try {
        await updateStatus(activeId, {
          status: newStatus,
        });
      } catch (err) {
        console.error("Erro ao atualizar status:", err);
      }
    }
  };

  if (!board.length) return null;

  return (
    <>
    <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {board.map((column) => (
          <KanbanColumn key={column.id} column={column} onCardClick={handleOpenDetails} />
        ))}
      </div>
    </DndContext>

      <ApplicationDetailsModal
          isOpen={isDetailsOpen}
          application={selectedApplication}
          onClose={handleCloseDetails}
          onEdit={() => {
            console.log("editar");
          }}
          onDelete={() => {
            console.log("deletar");
          }}
      />
</>
  );
}