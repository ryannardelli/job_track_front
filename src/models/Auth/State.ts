import { User } from "@/models/Users/User";

export type State = {
  user: User | null;
   token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};