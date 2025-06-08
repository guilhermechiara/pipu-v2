import { useApiSuspenseQuery } from "../../../lib/api/hooks";
import { AssessmentCyclesResponse } from "../types/assessmentCycle";

export function useAssessmentCycles() {
  return useApiSuspenseQuery<AssessmentCyclesResponse>(
    ["assessment-cycles"],
    `/assessment-cycles`,
  );
}
