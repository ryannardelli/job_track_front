import { StudentDashboardStats } from "@/models/Dashboard/StudentDashboardStats";

export type DashboardState = {
  studentStats: StudentDashboardStats | null;
  loading: boolean;
  error: string | null;
};