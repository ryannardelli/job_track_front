import { StudentDashboardStats } from "@/models/Dashboard/StudentDashboardStats";

export type DashboardAction =
  | { type: "SET_STUDENT_STATS"; payload: StudentDashboardStats }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };