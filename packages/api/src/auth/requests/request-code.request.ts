import { z } from "zod";

export const RequestCodeRequestSchema = z.object({
  email: z.email().min(1, "email is required"),
});

export type RequestCodeRequest = z.infer<typeof RequestCodeRequestSchema>;
