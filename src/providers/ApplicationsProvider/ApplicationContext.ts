import { createContext } from "react";

import { CreateApplicationDTO } from "@/models/Applications/CreateApplicationDTO";
import { Application } from "@/models/Applications/Application";
import { UpdateApplicationStatusDTO } from "@/models/Applications/UpdateApplicationStatusDTO ";
import { UpdateApplicationDTO } from "@/models/Applications/UpdateApplicationDTO";
import { ApplicationState } from "@/models/Applications/ApplicationState";
import { ApplicationAction } from "@/models/Applications/ApplicationActions";
import { initialStateApplication } from "@/reducers/applicationsReducer";

type ApplicationContextType = {
  stateApplication: ApplicationState;
  dispatchApplication: (action: ApplicationAction) => void;

  loadApplications: () => Promise<void>;
  loadApplicationBoard: () => Promise<void>;

  create: (data: CreateApplicationDTO) => Promise<Application & { message: string }>;
  update: (
    uuid: string,
    data: UpdateApplicationDTO
  ) => Promise<Application & { message: string }>;

  remove: (uuid: string) => Promise<void & { message: string }>;

  updateStatus: (
    uuid: string,
    data: UpdateApplicationStatusDTO
  ) => Promise<Application>;

  getById: (uuid: string) => Promise<Application>;
};

export const ApplicationContext =
  createContext<ApplicationContextType>({
    stateApplication: initialStateApplication,
    dispatchApplication: () => undefined,

    loadApplications: async () => {
      throw new Error("loadApplications not implemented");
    },

    loadApplicationBoard: async () => {
      throw new Error("loadApplicationBoard not implemented");
    },

    create: async () => {
      throw new Error("create application not implemented");
    },

    update: async () => {
      throw new Error("update application not implemented");
    },

    remove: async () => {
      throw new Error("remove application not implemented");
    },

    updateStatus: async () => {
      throw new Error("updateStatus not implemented");
    },

    getById: async () => {
      throw new Error("getById not implemented");
    },
  });