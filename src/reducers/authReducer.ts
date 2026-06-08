import { AuthAction } from "@/models/Auth/AuthActions";
import { AuthState } from "@/models/Auth/AuthState";

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export function authReducer(
  state: AuthState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case "LOGOUT":
      return {
        ...initialState,
        loading: false,
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