export interface KanbanColumnProps {
  column: {
    id: string;
    title: string;
    count: number;
    color: string;
    cards: any[];
  };
}