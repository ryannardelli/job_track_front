import { User } from "@/models/Users/User";

export type AuthAction =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "REGISTER"; payload: { user: User; token: string } }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }