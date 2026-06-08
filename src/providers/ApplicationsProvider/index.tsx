import {
  useEffect,
  useReducer,
  type ReactNode,
  useCallback,
} from "react";

import { ApplicationContext } from "./ApplicationContext";

import {
  createApplication,
  getApplications,
  getApplicationBoard,
  getApplicationById,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
} from "../../services/application";

import { useAuth } from "@hooks/useAuth";
import { CreateApplicationDTO } from "@/models/Applications/CreateApplicationDTO";
import { UpdateApplicationDTO } from "@/models/Applications/UpdateApplicationDTO";
import { UpdateApplicationStatusDTO } from "@/models/Applications/UpdateApplicationStatusDTO ";
import { applicationReducer, initialStateApplication } from "@/reducers/applicationsReducer";

type ApplicationProviderProps = {
  children: ReactNode;
};

export const ApplicationProvider = ({
  children,
}: ApplicationProviderProps) => {
  const [stateApplication, dispatchApplication] = useReducer(
    applicationReducer,
    initialStateApplication
  );

  const { state } = useAuth();

  const loadApplications = useCallback(async () => {
    try {
      dispatchApplication({ type: "SET_LOADING", payload: true });

      const applications = await getApplications(state.token as string);

      dispatchApplication({
        type: "SET_APPLICATIONS",
        payload: applications,
      });
    } catch (error) {
      dispatchApplication({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Erro ao carregar candidaturas",
      });
    } finally {
      dispatchApplication({ type: "SET_LOADING", payload: false });
    }
  }, [state.token]);

  const loadApplicationBoard = useCallback(async () => {
    try {
      dispatchApplication({ type: "SET_LOADING", payload: true });

      const board = await getApplicationBoard(state.token as string);

      dispatchApplication({
        type: "SET_BOARD",
        payload: board,
      });
    } catch (error) {
      dispatchApplication({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Erro ao carregar quadro de candidaturas",
      });
    } finally {
      dispatchApplication({ type: "SET_LOADING", payload: false });
    }
  }, [state.token]);

  const create = async (data: CreateApplicationDTO) => {
    try {
      dispatchApplication({ type: "SET_LOADING", payload: true });

      const response = await createApplication(state.token as string, data);

      await loadApplicationBoard();

      return response;
    } catch (error) {
      dispatchApplication({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Erro ao criar candidatura",
      });

      throw error;
    } finally {
      dispatchApplication({ type: "SET_LOADING", payload: false });
    }
  };

  const update = async (uuid: string, data: UpdateApplicationDTO) => {
    try {
      dispatchApplication({ type: "SET_LOADING", payload: true });

      const response = await updateApplication(
        state.token as string,
        uuid,
        data
      );

      dispatchApplication({
        type: "UPDATE_APPLICATION",
        payload: response,
      });

      return response;
    } catch (error) {
      dispatchApplication({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar candidatura",
      });

      throw error;
    } finally {
      dispatchApplication({ type: "SET_LOADING", payload: false });
    }
  };

  const remove = async (uuid: string) => {
    try {
      dispatchApplication({ type: "SET_LOADING", payload: true });

      await deleteApplication(state.token as string, uuid);

      dispatchApplication({
        type: "DELETE_APPLICATION",
        payload: uuid,
      });
    } catch (error) {
      dispatchApplication({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Erro ao deletar candidatura",
      });

      throw error;
    } finally {
      dispatchApplication({ type: "SET_LOADING", payload: false });
    }
  };

  const updateStatus = async (
    uuid: string,
    data: UpdateApplicationStatusDTO
  ) => {
    try {
      dispatchApplication({ type: "SET_LOADING", payload: true });

      const response = await updateApplicationStatus(
        state.token as string,
        uuid,
        data.status
      );

      dispatchApplication({
        type: "UPDATE_APPLICATION_STATUS",
        payload: response,
      });

      return response;
    } catch (error) {
      dispatchApplication({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar status",
      });

      throw error;
    } finally {
      dispatchApplication({ type: "SET_LOADING", payload: false });
    }
  };

  const getById = async (uuid: string) => {
    try {
      dispatchApplication({ type: "SET_LOADING", payload: true });

      const response = await getApplicationById(
        state.token as string,
        uuid
      );

      return response;
    } catch (error) {
      dispatchApplication({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Erro ao buscar candidatura",
      });

      throw error;
    } finally {
      dispatchApplication({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    if (!state.isAuthenticated || !state.token) return;

    loadApplicationBoard();
  }, [state.isAuthenticated, state.token, loadApplicationBoard]);

  return (
    <ApplicationContext.Provider
      value={{
        stateApplication,
        dispatchApplication,
        loadApplications,
        loadApplicationBoard,
        create,
        update,
        remove,
        updateStatus,
        getById,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};