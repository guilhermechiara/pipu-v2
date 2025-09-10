"use client";

import { createContext, PropsWithChildren } from "react";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { Profile } from "../../features/profile/types/profile";

const ProfileContext = createContext<Profile>({} as Profile);

const ProfileProvider = ({ children }: PropsWithChildren) => {
  const profileQuery = useProfile();

  return (
    <ProfileContext.Provider value={profileQuery.data}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
