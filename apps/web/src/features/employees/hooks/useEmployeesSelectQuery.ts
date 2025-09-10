import { useApiQuery } from "../../../lib/api/query-hooks";
import { EmployeePaginatedResponse } from "../types/Employee";

export function useEmployeesSelectQuery({ search }: { search?: string }) {
  return useApiQuery<EmployeePaginatedResponse>(
    ["employees", search],
    search ? `/employees?search=${search}` : "/employees",
  );
}
