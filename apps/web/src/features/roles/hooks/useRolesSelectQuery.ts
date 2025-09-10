import { useApiQuery } from "../../../lib/api/query-hooks";
import { PaginatedRolesResponse } from "../types/role";

export function useRolesSelectQuery({ search }: { search?: string }) {
  return useApiQuery<PaginatedRolesResponse>(
    ["roles", search],
    search ? `/roles?search=${search}` : "/roles",
  );
}
