export type Assessment = {
  score: number;
  criteria: string;
  highlights: AssessmentHighlight[];
  improvements: AssessmentImprovement[];
};

export type AssessmentHighlight = {
  title: string;
  description: string;
};

export type AssessmentImprovement = {
  title: string;
  description: string;
};

export type AssessmentsResponse = Assessment[];
export type AssessmentsRequest = void;
