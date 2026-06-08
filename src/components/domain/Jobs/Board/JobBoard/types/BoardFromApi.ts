import { ApplicationCard } from "@/components/domain/Jobs/Board/JobBoard/types/ApplicationCard";

export type BoardFromApi = {
  WISHLIST?: ApplicationCard[];
  APPLIED?: ApplicationCard[];
  INTERVIEW?: ApplicationCard[];
  OFFER?: ApplicationCard[];
  REJECTED?: ApplicationCard[];
};