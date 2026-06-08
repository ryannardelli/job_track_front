import { User } from "@/models/Users/User";

export type AuthResponse = {
  token: string;
  user: User;
};