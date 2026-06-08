import { useReducer, useEffect, type ReactNode } from "react";

import { DashboardContext } from "./DashboardContext";
import { getDashboardStats } from "../../services/dashboard";
import { useAuth } from "../../hooks/useAuth";
import { dashboardReducer, initialStateDashboard } from "@/reducers/dashboardReducer";

type Props = {
  children: ReactNode;
};

export const DashboardProvider = ({ children }: Props) => {
  const [stateDashboard, dispatchDashboard] = useReducer(
    dashboardReducer,
    initialStateDashboard
  );

  const { state } = useAuth();
  const token = state.token;
  const isAuthenticated = state.isAuthenticated;
  
  const loadDashboardStats = async () => {
    if (!token) return;

    try {
      dispatchDashboard({ type: "SET_LOADING", payload: true });

      const stats = await getDashboardStats(token);

      dispatchDashboard({
        type: "SET_STUDENT_STATS",
        payload: stats,
      });
    } catch (error) {
      dispatchDashboard({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Erro ao carregar dashboard",
      });
    } finally {
      dispatchDashboard({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    loadDashboardStats();
  }, [isAuthenticated]);

  return (
    <DashboardContext.Provider
      value={{
        stateDashboard,
        dispatchDashboard,
        loadDashboardStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};