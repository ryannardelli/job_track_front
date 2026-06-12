import { ApplicationStatus } from "@/models/Applications/ApplicationStatus";

export type CreateApplicationDTO = {
  company: string;
  position: string;
  vacancyUrl?: string | null;
  applicationDate?: string | null;
  notes?: string | null;
  status: ApplicationStatus;
};