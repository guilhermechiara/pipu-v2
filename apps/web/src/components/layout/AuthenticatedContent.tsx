"use client";

import { PropsWithChildren } from "react";
import { useAuth } from "../../lib/providers/AuthProviderClient";
import { ProfileProvider } from "../../lib/providers/ProfileProvider";

export function AuthenticatedContent({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return <ProfileProvider>{children}</ProfileProvider>;
}
