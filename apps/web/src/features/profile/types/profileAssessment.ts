type AssessmentStatus = "none" | "in_progress" | "completed";

interface AssessmentItem {
  title: string;
  description: string;
}

interface Assessment {
  score: number;
  criteria: "under" | "meet" | "over";
  status: AssessmentStatus;
  highlights: AssessmentItem[];
  improvements: AssessmentItem[];
}

export type { Assessment, AssessmentItem, AssessmentStatus };
