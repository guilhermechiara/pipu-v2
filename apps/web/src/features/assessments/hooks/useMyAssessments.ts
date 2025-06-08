import { useApiSuspenseQuery } from "../../../lib/api/hooks";
import { AssessmentsResponse } from "../types/assessment";

export function useMyAssessments() {
  return useApiSuspenseQuery<AssessmentsResponse>(
    ["assessments", "my"],
    "/assessments/my",
  );
}
