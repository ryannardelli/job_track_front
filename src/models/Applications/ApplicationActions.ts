import { Application } from "@/models/Applications/Application";
import { ApplicationBoard } from "@/models/Applications/ApplicationBoard";

export type ApplicationAction =
  | { type: "SET_APPLICATIONS"; payload: Application[] }
  | { type: "SET_BOARD"; payload: ApplicationBoard }

  | { type: "ADD_APPLICATION"; payload: Application }
  | { type: "UPDATE_APPLICATION"; payload: Application }
  | { type: "DELETE_APPLICATION"; payload: string }

  | { type: "UPDATE_APPLICATION_STATUS"; payload: Application }

  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };