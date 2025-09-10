import { useApiSuspenseQuery } from "../../../lib/api/query-hooks";
import { EmployeeProfile } from "../types/EmployeeProfile";

export function useEmployeeAvatarQuery({ id }: { id: string }) {
  return useApiSuspenseQuery<EmployeeProfile>(
    ["employees/profile", id],
    `/employees/${id}/profile`,
  );
}
