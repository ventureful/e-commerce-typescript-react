/* eslint-disable security/detect-object-injection */
import React from "react";
import useAuthentication from "./useAuthentication";
import { UseAuthI } from "../types";

interface UseStoreProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<UseAuthI | undefined>(undefined);

export const AuthStoreProvide = ({ children }: UseStoreProps) => {
  const auth = useAuthentication();

  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  );
};

const useAuthStore = () => {
  const context: UseAuthI | undefined = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthStore must be used within a AuthStoreProvider");
  }

  return context;
};

export default useAuthStore;
