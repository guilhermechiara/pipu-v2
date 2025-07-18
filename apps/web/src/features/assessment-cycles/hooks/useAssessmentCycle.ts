import { useApiSuspenseQuery } from "../../../lib/api/hooks";
import { AssessmentCycleResponse } from "../types/assessmentCycle";

export function useAssessmentCycle(id: string) {
  return useApiSuspenseQuery<AssessmentCycleResponse>(
    ["assessment-cycles", id],
    `/assessment-cycles/${id}`,
  );
}
