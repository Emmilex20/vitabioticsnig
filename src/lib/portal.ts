import { z } from "zod";

export const portalRequestSchema = z.object({
  type: z.enum([
    "PHARMACY_TRAINING",
    "SAMPLE_DAY",
    "DOCTOR_CME_CPD",
    "DOCTOR_SAMPLE_REQUEST",
  ]),
  title: z.string().min(3, "Title must be at least 3 characters"),
  organization: z.string().min(2, "Organization is required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(10, "Please provide more details"),
});
