"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { getUserInitials } from "@/src/lib/get-user-initials";
import { updateProfileAction, type UpdateProfileActionState } from "./actions";

type ProfileFormProps = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

export function ProfileForm({ name, email, avatarUrl }: ProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(avatarUrl);

  const [state, action, isPending] = useActionState<
    UpdateProfileActionState | null,
    FormData
  >(updateProfileAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Profile updated successfully.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (state.newAvatarUrl) setPreview(state.newAvatarUrl);
    }
  }, [state]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  return (
    <form action={action}>
      <FieldGroup>
        {/* Avatar picker */}
        <Field>
          <FieldLabel>Avatar</FieldLabel>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="size-16 shrink-0 rounded-full overflow-hidden bg-muted flex items-center justify-center text-xl font-bold uppercase ring-2 ring-border hover:ring-primary transition-all focus-visible:outline-none focus-visible:ring-primary"
              aria-label="Change avatar"
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Avatar preview"
                  className="size-full object-cover"
                />
              ) : (
                <span>{getUserInitials(name)}</span>
              )}
            </button>
            <div className="flex flex-col gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isPending}
              >
                Choose image
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or WebP · max 5 MB
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            name="avatar"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handleFileChange}
            disabled={isPending}
          />
          {state?.errors?.avatar && (
            <FieldError>{state.errors.avatar}</FieldError>
          )}
        </Field>

        {/* Name */}
        <Field>
          <FieldLabel htmlFor="profile-name">Name</FieldLabel>
          <Input
            id="profile-name"
            name="name"
            placeholder="John Doe"
            defaultValue={state?.fields?.name ?? name}
            disabled={isPending}
            className={cn(state?.errors?.name && "border-destructive")}
          />
          {state?.errors?.name && (
            <FieldError>{state.errors.name}</FieldError>
          )}
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="profile-email">Email</FieldLabel>
          <Input
            id="profile-email"
            name="email"
            type="email"
            placeholder="example@example.com"
            defaultValue={state?.fields?.email ?? email}
            disabled={isPending}
            className={cn(state?.errors?.email && "border-destructive")}
          />
          {state?.errors?.email && (
            <FieldError>{state.errors.email}</FieldError>
          )}
        </Field>

        {state?.apiError && <FieldError>{state.apiError}</FieldError>}

        <Field>
          <Button type="submit" disabled={isPending} className="w-fit">
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
