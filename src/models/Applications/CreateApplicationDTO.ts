export type CreateApplicationDTO = {
  company: string;
  position: string;
  vacancyUrl?: string | null;
  applicationDate?: string | null;
  notes?: string | null;
};