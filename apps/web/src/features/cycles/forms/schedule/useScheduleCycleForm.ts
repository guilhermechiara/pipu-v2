import { z } from "zod/v4";
import dayjs from "dayjs";

type ScheduleCycleFormReturn = {
  schema: typeof scheduleCycleFormSchema;
};

const scheduleCycleFormSchema = z
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

type ScheduleCycleFormValues = z.infer<typeof scheduleCycleFormSchema>;

const useScheduleCycleForm = (): ScheduleCycleFormReturn => ({
  schema: scheduleCycleFormSchema,
});

export const DEFAULT_ASSESSMENT_CYCLE_MIN_DATES = dayjs().toDate();
export const DEFAULT_ASSESSMENT_CYCLE_MAX_DATES = dayjs()
  .add(1, "year")
  .toDate();

export { useScheduleCycleForm, type ScheduleCycleFormValues };
