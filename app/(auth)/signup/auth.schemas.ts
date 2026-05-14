import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { error: "Name is required" })
      .max(100, { error: "Name must be at most 100 characters" }),
    email: z.email().trim().min(1, { error: "Email is required" }),
    password: z
      .string()
      .min(1, { error: "Password is required" })
      .min(6, { error: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "The passwords do not match",
  });

export type SignupInput = z.infer<typeof signUpSchema>;
