import { useApiSuspenseQuery } from "../../../lib/api/hooks";
import { AssessmentCyclesResponse } from "../types/assessmentCycle";

export function useMyAssessmentCycles() {
  return useApiSuspenseQuery<AssessmentCyclesResponse>(
    ["cycles", "my"],
    "/cycles/my",
  );
}
