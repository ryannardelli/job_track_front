import { DashboardAction } from "@/models/Dashboard/DashboardActions";
import { DashboardState } from "@/models/Dashboard/DashboardState";

export const initialStateDashboard: DashboardState = {
  studentStats: null,
  loading: false,
  error: null,
};

export function dashboardReducer(
  state: DashboardState,
  action: DashboardAction
): DashboardState {
  switch (action.type) {
    case "SET_STUDENT_STATS":
      return {
        ...state,
        studentStats: action.payload,
        error: null,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}