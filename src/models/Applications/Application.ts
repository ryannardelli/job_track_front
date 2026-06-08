import { ApplicationStatus } from "@/models/Applications/ApplicationStatus";

export type Application = {
  uuid: string;
  company: string;
  position: string;
  vacancyUrl: string | null;
  status: ApplicationStatus;
  applicationDate: string | null;
  notes: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};