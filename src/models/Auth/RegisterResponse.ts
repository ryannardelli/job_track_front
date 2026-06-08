import { AuthUser } from "@/models/Users/AuthUser";

export type RegisterResponse = {
  token: string;
  user: AuthUser;
};