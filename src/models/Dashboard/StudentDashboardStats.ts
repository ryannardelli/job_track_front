import { StatusStat } from "@/models/Dashboard/StatusStat";

export type StudentDashboardStats = {
  total: number;

  applied: StatusStat;
  interview: StatusStat;
  offer: StatusStat;
  rejected: StatusStat;
};