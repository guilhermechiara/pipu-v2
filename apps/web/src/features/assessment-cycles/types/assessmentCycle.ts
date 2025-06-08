export enum AssessmentCycleStatus {
  IN_PROGRESS = "IN_PROGRESS",
  UPCOMING = "UPCOMING",
  COMPLETED = "COMPLETED",
}

export type AssessmentCycle = {
  id: string;
  name: string;
  frequency: string;
  message: string;
  cycleDates: {
    startDate: Date;
    endDate: Date;
  };
  adjustmentDates: {
    startDate: Date;
    endDate: Date;
  };
  shareDates: {
    startDate: Date;
    endDate: Date;
  };
  chapters: {
    id: string;
    name: string;
  }[];
};

export type AssessmentCycleResponse = AssessmentCycle & {
  statistics: {
    assessment: {
      completed: number;
      total: number;
    };
    adjustment: {
      completed: number;
      total: number;
    };
    share: {
      completed: number;
      total: number;
    };
  };
};

export type AssessmentCyclesResponse = AssessmentCycle[];
export type AssessmentCyclesRequest = void;

export type CreateAssessmentCycleRequest = {
  name: string;
  frequency: string;
  cycleDates: {
    startDate: Date;
    endDate: Date;
  };
  adjustmentDates: {
    startDate: Date;
    endDate: Date;
  };
  shareDates: {
    startDate: Date;
    endDate: Date;
  };
};

export type EditAssessmentCycleRequest = Omit<
  CreateAssessmentCycleRequest,
  "name" | "frequency"
>;

export type EditAssessmentCycleResponse = AssessmentCycle;
