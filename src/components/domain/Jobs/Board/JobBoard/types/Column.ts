import { ApplicationCard } from "@/components/domain/Jobs/Board/JobBoard/types/ApplicationCard";

export type Column = {
  id: string;
  title: string;
  color: string;
  cards: ApplicationCard[];
};