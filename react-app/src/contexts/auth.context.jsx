import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const AllContext = useAuth();
  return (
    <AuthContext.Provider value={AllContext}>{children}</AuthContext.Provider>
  );
};
