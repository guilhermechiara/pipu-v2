"use client";

import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { apiClient } from "../api/client";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, expiresAt: Date) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = Cookies.get("token") ?? null;
  const expiresAt = Cookies.get("expiresAt");

  const isAuthenticated = !!token;

  useEffect() => {
    const token = Cookies.get("token");

    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokenFromCookie}`;
    }

  }, [])

  const login = (token: string, expiresAt: Date) => {
    Cookies.set("token", token, {
      expires: expiresAt,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("expiresAt", expiresAt.toISOString(), { expires: expiresAt });

    apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("expiresAt");
  };

  const value: AuthContextType = {
    isAuthenticated,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, AuthContext };
