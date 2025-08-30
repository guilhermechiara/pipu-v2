import { z } from "zod";

export const CreateEmployeeRequestSchema = z.object({
  fullName: z.string().min(1, "full name is required"),
  email: z.email().min(1, "email is required"),
  currentLeaderId: z.string().optional(),
  currentPeoplePartnerId: z.string().optional(),
});

export type CreateEmployeeRequest = z.infer<typeof CreateEmployeeRequestSchema>;
