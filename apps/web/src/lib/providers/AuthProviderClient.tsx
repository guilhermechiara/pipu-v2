"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextType {
  status: AuthStatus;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  initialAuthState: AuthStatus;
}

export function AuthProviderClient({
  children,
  initialAuthState,
}: PropsWithChildren<AuthProviderProps>) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(initialAuthState);

  const login = useCallback(() => {
    setAuthStatus("authenticated");
  }, []);

  const logout = useCallback(() => {
    setAuthStatus("unauthenticated");
  }, []);

  const value: AuthContextType = {
    status: authStatus,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
