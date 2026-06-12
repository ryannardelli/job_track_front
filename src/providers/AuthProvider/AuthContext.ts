import { createContext, Dispatch } from "react";

import { initialState } from "@/reducers/authReducer";
import { AuthAction } from "@/models/Auth/AuthActions";
import { AuthUser } from "@/models/Users/AuthUser";
import { State } from "@/models/Auth/State";
import { RegisterResponse } from "@/models/Auth/RegisterResponse";

type ContextType = {
  state: State;
  dispatch: Dispatch<AuthAction>;

  login: (email: string, password: string) => Promise<AuthUser>;

  registerUser: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<RegisterResponse>;

  logout: () => void;
};

export const AuthContext = createContext<ContextType>({
  state: initialState,

  dispatch: () => undefined as any,

  login: async () => {
    throw new Error("login não implementado");
  },

  registerUser: async () => {
    throw new Error("registerUser não implementado");
  },

  logout: () => {
    throw new Error("logout não implementado");
  },
});