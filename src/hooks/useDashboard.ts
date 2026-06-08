import { DashboardContext } from "@/providers/DashboardProvider/DashboardContext";
import { useContext } from "react";

export function useDashboard() {
    return useContext(DashboardContext);
} 