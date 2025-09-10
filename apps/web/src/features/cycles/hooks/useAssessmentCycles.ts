import { useApiSuspenseQuery } from "../../../lib/api/query-hooks";
import { AssessmentCyclesResponse } from "../types/assessmentCycle";

export function useAssessmentCycles() {
  return useApiSuspenseQuery<AssessmentCyclesResponse>(
    ["cycles"],
    `/assessment-cycles`,
  );
}
