import { z } from "zod";

export const VerifyCodeRequestSchema = z.object({
  email: z.email().min(1, "email is required"),
  code: z
    .string()
    .min(6, "code must be 6 digits")
    .max(6, "code must be 6 digits"),
});

export type VerifyCodeRequest = z.infer<typeof VerifyCodeRequestSchema>;
