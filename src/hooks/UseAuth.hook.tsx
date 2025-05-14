import { useContext } from "react";
import { AuthStore } from "../stores/auth.store";

export const useAuth = () => {
  const context = useContext(AuthStore);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};