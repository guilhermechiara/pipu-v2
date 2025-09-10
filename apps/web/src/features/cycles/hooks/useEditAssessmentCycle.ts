import { useApiPatchMutation } from "../../../lib/api/query-hooks";
import {
  EditAssessmentCycleRequest,
  EditAssessmentCycleResponse,
} from "../types/assessmentCycle";

export function useEditAssessmentCycle(id: string) {
  return useApiPatchMutation<
    EditAssessmentCycleResponse,
    EditAssessmentCycleRequest
  >(`/assessment-cycles/${id}`);
}
