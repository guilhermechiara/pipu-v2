import { ProfileResponse } from "../types/profile";
import { useApiSuspenseQuery } from "../../../lib/api/hooks";

export function useProfile() {
  return useApiSuspenseQuery<ProfileResponse>(["profile"], "/profile/me");
}
