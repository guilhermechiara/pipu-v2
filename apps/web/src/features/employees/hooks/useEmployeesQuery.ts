import { ApiClient } from "../../../lib/api/api";
import { useApiQueryOptions } from "../../../lib/api/query-hooks";
import { EmployeeResponse } from "@pipu/api";
import { ApiError } from "../../../lib/apiError";

export type EmployeesKey = ["employees", string?];

export function useEmployeesQueryOptions(
  client: ApiClient,
  { search }: { search?: string },
) {
  return useApiQueryOptions<EmployeeResponse[], ApiError, EmployeeResponse[]>(
    client,
    ["employees", search],
    `/employees?q=${search}`,
  );
}
