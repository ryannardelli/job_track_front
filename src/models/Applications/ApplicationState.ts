import { Application } from "@/models/Applications/Application";
import { ApplicationBoard } from "@/models/Applications/ApplicationBoard";

export type ApplicationState = {
  applications: Application[];
  board: ApplicationBoard | null;
  loading: boolean;
  error: string | null;
};