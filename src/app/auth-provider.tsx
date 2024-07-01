"use client";

import { createContext, useContext } from "react";
import { User } from "lucia";

type TAuthContext = {
  user: User | null;
  isAuthenticated: boolean;
} | null;

const authContext = createContext<TAuthContext>(null);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const isAuthenticated = Boolean(user?.id);
  const values = {
    user,
    isAuthenticated,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthProvider;
