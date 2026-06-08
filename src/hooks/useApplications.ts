import { ApplicationContext } from "@/providers/ApplicationsProvider/ApplicationContext";
import { useContext } from "react";

export function useApplications() {
    return useContext(ApplicationContext);
} 