import { AuthProviderClient } from "./AuthProviderClient";
import { getSession } from "../session";
import React from "react";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <AuthProviderClient
      initialAuthState={session ? "authenticated" : "unauthenticated"}
    >
      {children}
    </AuthProviderClient>
  );
}
