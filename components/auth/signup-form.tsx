"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthFormCard } from "./auth-form-card";
import { ROUTES } from "@/shared/constants/routes";

const signUpFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { error: "Name is required" })
      .min(2, { error: "Name must be at least 2 characters long" })
      .max(100, { error: "Name must be at most 100 characters" }),
    email: z.email().trim().min(1, { error: "Email is required" }),
    password: z
      .string()
      .min(6, { error: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "The passwords do not match",
  });

export function SignupForm() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <AuthFormCard
      title="Create an account"
      description="Enter your information below to create your account"
    >
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="signup-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="signup-email"
                  aria-invalid={fieldState.invalid}
                  type="email"
                  placeholder="example@example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="signup-password"
                  aria-invalid={fieldState.invalid}
                  type="password"
                  placeholder="******"
                />

                <FieldDescription>
                  Password must be at least 6 characters long.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-confirm-password">
                  Confirm password
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-confirm-password"
                  aria-invalid={fieldState.invalid}
                  type="password"
                />
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button type="submit">Create Account</Button>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href={ROUTES.LOGIN}>Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </AuthFormCard>
  );
}
