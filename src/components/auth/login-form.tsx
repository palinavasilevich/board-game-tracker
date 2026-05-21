"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { AuthFormCard } from "./auth-form-card";
import { ROUTES } from "@/src/shared/constants/routes";
import { loginAction } from "@/src/app/(guest)/login/actions";
import { cn } from "@/src/lib/utils";

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <AuthFormCard
      title="Login to your account"
      description="Enter your email below to login to your account"
    >
      <form action={action}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="login-email">Email</FieldLabel>
            <Input
              id="login-email"
              name="email"
              type="email"
              placeholder="example@example.com"
              disabled={isPending}
              className={cn(state?.errors?.email && "border-destructive")}
            />
            {state?.errors?.email && (
              <FieldError>{state.errors.email}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="login-password">Password</FieldLabel>
            <Input
              id="login-password"
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

          {state?.apiError && <FieldError>{state.apiError}</FieldError>}

          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Sending..." : "Login"}
            </Button>
            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.SIGNUP}>Sign up</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </AuthFormCard>
  );
}
