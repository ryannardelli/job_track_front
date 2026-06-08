import { Application } from "@/models/Applications/Application";

export type ApplicationBoard = {
  APPLIED: Application[];
  INTERVIEW: Application[];
  OFFER: Application[];
  REJECTED: Application[];
};