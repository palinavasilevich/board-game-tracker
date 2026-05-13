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

const loginFormSchema = z.object({
  email: z.email().trim().min(1, { error: "Email is required" }),
  password: z.string().min(1, { error: "Password is required" }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <AuthFormCard
      title="Login to your account"
      description="Enter your email below to login to your account"
    >
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="login-email"
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
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="login-password"
                  aria-invalid={fieldState.invalid}
                  type="password"
                  placeholder="******"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button type="submit">Login</Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.SIGNUP}>Sign up</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </AuthFormCard>
  );
}
