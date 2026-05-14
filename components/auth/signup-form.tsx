"use client";

import Link from "next/link";
import { useActionState } from "react";
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
import { signupAction } from "@/app/(auth)/signup/actions";
import { cn } from "@/lib/utils";

export function SignupForm() {
  const [state, action, isPending] = useActionState(signupAction, null);

  return (
    <AuthFormCard
      title="Create an account"
      description="Enter your information below to create your account"
    >
      <form action={action}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="signup-name">Name</FieldLabel>
            <Input
              id="signup-name"
              name="name"
              placeholder="John Doe"
              defaultValue={state?.fields?.name ?? ""}
              disabled={isPending}
              className={cn(state?.errors?.name && "border-destructive")}
            />
            {state?.errors?.name && (
              <FieldError>{state.errors.name}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="signup-email">Email</FieldLabel>
            <Input
              id="signup-email"
              name="email"
              type="email"
              placeholder="example@example.com"
              defaultValue={state?.fields?.email ?? ""}
              disabled={isPending}
              className={cn(state?.errors?.email && "border-destructive")}
            />
            {state?.errors?.email && (
              <FieldError>{state.errors.email}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="signup-password">Password</FieldLabel>
            <FieldDescription>
              Password must be at least 6 characters long.
            </FieldDescription>
            <Input
              id="signup-password"
              name="password"
              type="password"
              placeholder="••••••"
              disabled={isPending}
              className={cn(state?.errors?.password && "border-destructive")}
            />
            {state?.errors?.password && (
              <FieldError>{state.errors.password}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="signup-confirm-password">
              Confirm password
            </FieldLabel>
            <FieldDescription>Please confirm your password.</FieldDescription>
            <Input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="••••••"
              disabled={isPending}
              className={cn(
                state?.errors?.confirmPassword && "border-destructive",
              )}
            />
            {state?.errors?.confirmPassword && (
              <FieldError>{state.errors.confirmPassword}</FieldError>
            )}
          </Field>

          {state?.apiError && <FieldError>{state.apiError}</FieldError>}

          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating account..." : "Create Account"}
            </Button>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href={ROUTES.LOGIN}>Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </AuthFormCard>
  );
}
