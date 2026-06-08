import { AuthContext } from "@/providers/AuthProvider/AuthContext";
import { useContext } from "react";

export function useAuth() {
    return useContext(AuthContext);
}