import { useEffect, useReducer } from "react";
import { User } from "@/models/Users/User";
import { authReducer, initialState } from "@/reducers/authReducer";
import { userAuthentication } from "@/services/auth";
import { AuthUser } from "@/models/Users/AuthUser";
import { getMe } from "@/services/users";
import { AuthContext } from "@/providers/AuthProvider/AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    async function restoreSession() {
      const token = state.token;

      if (!token) {
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }

      try {
        dispatch({ type: "SET_LOADING", payload: true });

        const user = await getMe(token);

        dispatch({
          type: "LOGIN",
          payload: { token, user },
        });
      } catch (err) {
        dispatch({ type: "LOGOUT" });
        console.warn("Aconteceu um problema inesperado ao fazer logout.", err);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    restoreSession();
  }, [state.token]);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthUser> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await userAuthentication.login({ email, password });
      const { token, user: initialUser } = response;

      let finalUser: User = initialUser;

      try {
        const fullUser = await getMe(token);
        if (fullUser) finalUser = fullUser;
      } catch (e) {
        console.warn("Erro ao buscar usuário:", e);
      }

      dispatch({
        type: "LOGIN",
        payload: {
          token,
          user: finalUser,
        },
      });

      return finalUser;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao fazer login";

      dispatch({ type: "SET_ERROR", payload: message });
      throw err;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await userAuthentication.register({
        name,
        email,
        password,
      });

      const { token, user: initialUser } = response;

      let finalUser: User = initialUser;

      try {
        const fullUser = await getMe(token);
        if (fullUser) finalUser = fullUser;
      } catch (e) {
        console.warn("Erro ao buscar usuário:", e);
      }

      dispatch({
        type: "REGISTER",
        payload: {
          token,
          user: finalUser,
        },
      });

      return { token, user: finalUser };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao registrar usuário";

      dispatch({ type: "SET_ERROR", payload: message });
      throw err;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};