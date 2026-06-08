import { ApplicationAction } from "@/models/Applications/ApplicationActions";
import { ApplicationState } from "@/models/Applications/ApplicationState";

export const initialStateApplication: ApplicationState = {
  applications: [],
  board: null,
  loading: false,
  error: null,
};

export function applicationReducer(
  state: ApplicationState,
  action: ApplicationAction
): ApplicationState {
  switch (action.type) {
    case "SET_APPLICATIONS":
      return {
        ...state,
        applications: action.payload,
        error: null,
      };

    case "SET_BOARD":
      return {
        ...state,
        board: action.payload,
        error: null,
      };

    case "ADD_APPLICATION":
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };

    case "UPDATE_APPLICATION":
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.uuid === action.payload.uuid ? action.payload : app
        ),
      };

    case "DELETE_APPLICATION":
      return {
        ...state,
        applications: state.applications.filter(
          (app) => app.uuid !== action.payload
        ),
      };

    case "UPDATE_APPLICATION_STATUS":
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.uuid === action.payload.uuid ? action.payload : app
        ),
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