import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "errorName").max(100),
  email: z.string().email("errorEmail"),
  message: z.string().min(20, "errorMessage").max(5000),
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
