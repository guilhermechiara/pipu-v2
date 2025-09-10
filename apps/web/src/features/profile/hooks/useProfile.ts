import { ProfileResponse } from "../types/profile";
import { useApiSuspenseQuery } from "../../../lib/api/query-hooks";

export function useProfile() {
  return useApiSuspenseQuery<ProfileResponse>(["profile"], "/profile/me");
}
