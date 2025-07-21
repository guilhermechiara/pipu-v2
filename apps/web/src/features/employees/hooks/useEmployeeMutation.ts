import { useApiMutation } from "../../../lib/api/hooks";
import {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
} from "../types/CreateEmployee";

export function useEmployeeMutation() {
  return useApiMutation<CreateEmployeeResponse, CreateEmployeeRequest>(
    "/employees",
  );
}
