import { useApiSuspenseQuery } from "../../../lib/api/hooks";
import { AssessmentCyclesResponse } from "../types/assessmentCycle";

export function useMyAssessmentCycles() {
  return useApiSuspenseQuery<AssessmentCyclesResponse>(
    ["assessment-cycles", "my"],
    "/assessment-cycles/my",
  );
}
