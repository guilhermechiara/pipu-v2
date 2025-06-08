import { z } from "zod/v4";
import dayjs from "dayjs";

type AssessmentCycleFormReturn = {
  schema: typeof assessmentCycleFormSchema;
};

const assessmentCycleFormSchema = z
  .object({
    cycleName: z.string().min(1, { error: "Cycle name is required" }),
    cycleFrequency: z.enum([
      "every three months",
      "every four months",
      "every six months",
      "every year",
    ]),
    cycleDates: z
      .object({
        startDate: z.date(),
        endDate: z.date(),
      })
      .refine((data) => dayjs(data.endDate).isAfter(data.startDate), {
        error: "Cycle end date must be after start date",
        path: ["endDate"],
      }),
    cycleAdjustmentDates: z
      .object({
        startDate: z.date(),
        endDate: z.date(),
      })
      .refine((data) => dayjs(data.endDate).isAfter(data.startDate), {
        error: "Adjustment end date must be after start date",
      }),
    cycleShareDates: z
      .object({
        startDate: z.date(),
        endDate: z.date(),
      })
      .refine((data) => dayjs(data.endDate).isAfter(data.startDate), {
        error: "Cycle end date must be after start date",
      }),
    cycleOptionalMessage: z.string(),
  })
  .refine(
    (data) =>
      dayjs(data.cycleAdjustmentDates.startDate).isAfter(
        data.cycleDates.endDate,
      ),
    {
      error: "Adjustment start date must be after cycle end date",
      path: ["cycleAdjustmentDates", "startDate"],
    },
  )
  .refine(
    (data) =>
      dayjs(data.cycleShareDates.startDate).isAfter(
        data.cycleAdjustmentDates.endDate,
      ),
    {
      error: "Share date must be after adjustment end date",
      path: ["cycleShareDate", "startDate"],
    },
  );

type AssessmentCycleFormValues = z.infer<typeof assessmentCycleFormSchema>;

const useAssessmentCycleForm = (): AssessmentCycleFormReturn => ({
  schema: assessmentCycleFormSchema,
});

export const DEFAULT_ASSESSMENT_CYCLE_MIN_DATES = dayjs().toDate();
export const DEFAULT_ASSESSMENT_CYCLE_MAX_DATES = dayjs()
  .add(1, "year")
  .toDate();

export { useAssessmentCycleForm, type AssessmentCycleFormValues };
