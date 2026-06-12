"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import {
  changePasswordAction,
  type ChangePasswordActionState,
} from "./actions";

export function ChangePasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, isPending] = useActionState<
    ChangePasswordActionState | null,
    FormData
  >(changePasswordAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Password changed successfully.");
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <form action={action} ref={formRef}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
          <Input
            id="current-password"
            name="currentPassword"
            type="password"
            placeholder="••••••"
            disabled={isPending}
            className={cn(
              state?.errors?.currentPassword && "border-destructive",
            )}
          />
          {state?.errors?.currentPassword && (
            <FieldError>{state.errors.currentPassword}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="new-password">New Password</FieldLabel>
          <FieldDescription>At least 6 characters.</FieldDescription>
          <Input
            id="new-password"
            name="newPassword"
            type="password"
            placeholder="••••••"
            disabled={isPending}
            className={cn(state?.errors?.newPassword && "border-destructive")}
          />
          {state?.errors?.newPassword && (
            <FieldError>{state.errors.newPassword}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">
            Confirm New Password
          </FieldLabel>
          <Input
            id="confirm-password"
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
            {isPending ? "Updating..." : "Change Password"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
