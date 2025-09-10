import { useApiMutation } from "../../../lib/api/query-hooks";
import {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
} from "../types/CreateEmployee";

export function useEmployeeMutation() {
  return useApiMutation<CreateEmployeeResponse, CreateEmployeeRequest>(
    "/employees",
  );
}
