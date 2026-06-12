import { ApplicationCard } from "@/components/domain/Jobs/Board/JobBoard/types/ApplicationCard";

export interface KanbanColumnProps {
  column: {
    id: string;
    title: string;
    color: string;
    cards: ApplicationCard[];
  };

  onCardClick: (application: ApplicationCard) => void;
}