import { useApiPatchMutation } from "../../../lib/api/query-hooks";
import {
  UpdateEmployeeRequest,
  UpdateEmployeeResponse,
} from "../types/UpdateEmployee";

export function useEmployeeUpdateMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  return useApiPatchMutation<UpdateEmployeeResponse, UpdateEmployeeRequest>(
    `/employees/${id}`,
    {
      onSuccess,
    },
  );
}
