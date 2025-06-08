import { FindRoleByIdRequest, FindRoleByIdResponse } from "../types/role";
import { useApiSuspenseQuery } from "../../../lib/api/hooks";

export function useRole({ id }: FindRoleByIdRequest) {
  return useApiSuspenseQuery<FindRoleByIdResponse>(
    ["roles", id],
    `/roles/${id}`,
  );
}
