import { createContext } from "react";
import { DashboardState } from "@/models/Dashboard/DashboardState";
import { DashboardAction } from "@/models/Dashboard/DashboardActions";
import { initialStateDashboard } from "@/reducers/dashboardReducer";

type DashboardContextType = {
  stateDashboard: DashboardState;
  dispatchDashboard: (action: DashboardAction) => void;
  loadDashboardStats: () => Promise<void>;
};

export const DashboardContext = createContext<DashboardContextType>({
  stateDashboard: initialStateDashboard,
  dispatchDashboard: () => undefined,
  loadDashboardStats: async () => {
    throw new Error("loadDashboardStats not implemented");
  },
});