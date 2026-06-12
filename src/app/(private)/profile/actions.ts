"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth, unstable_update } from "@/auth";
import { prisma } from "@/src/lib/db";
import { Prisma } from "@/src/lib/generated/prisma/client";
import { uploadAvatar } from "@/src/lib/cloudinary";

// ── Update profile ────────────────────────────────────────────────────────────

const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Name is required" })
    .max(100, { error: "Name must be at most 100 characters" }),
  email: z.email().trim(),
});

export type UpdateProfileActionState = {
  success?: boolean;
  newAvatarUrl?: string;
  apiError?: string;
  fields?: { name?: string; email?: string };
  errors?: { name?: string; email?: string; avatar?: string };
};

export async function updateProfileAction(
  _prevState: UpdateProfileActionState | null,
  formData: FormData,
): Promise<UpdateProfileActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { apiError: "Unauthorized" };
  }

  const fields = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  };

  const parsed = updateProfileSchema.safeParse(fields);

  if (!parsed.success) {
    return {
      fields,
      errors: Object.fromEntries(
        parsed.error.issues.map((i) => [i.path[0], i.message]),
      ) as UpdateProfileActionState["errors"],
    };
  }

  const { name, email } = parsed.data;

  // Handle avatar upload if a file was provided
  let avatarUrl: string | undefined;
  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile.size > 0) {
    if (!avatarFile.type.startsWith("image/")) {
      return { fields, errors: { avatar: "File must be an image" } };
    }
    if (avatarFile.size > 5 * 1024 * 1024) {
      return { fields, errors: { avatar: "Image must be smaller than 5 MB" } };
    }
    try {
      avatarUrl = await uploadAvatar(avatarFile);
    } catch {
      return { fields, apiError: "Failed to upload image. Please try again." };
    }
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        ...(avatarUrl !== undefined && { avatarUrl }),
      },
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { apiError: "This email is already in use.", fields };
    }
    return { apiError: "Something went wrong. Please try again.", fields };
  }

  await unstable_update({ user: { name, email } });

  return { success: true, ...(avatarUrl !== undefined && { newAvatarUrl: avatarUrl }) };
}

// ── Change password ───────────────────────────────────────────────────────────

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { error: "Current password is required" }),
    newPassword: z
      .string()
      .min(6, { error: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { error: "Please confirm your password" }),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
  });

export type ChangePasswordActionState = {
  success?: boolean;
  apiError?: string;
  errors?: {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
};

export async function changePasswordAction(
  _prevState: ChangePasswordActionState | null,
  formData: FormData,
): Promise<ChangePasswordActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { apiError: "Unauthorized" };
  }

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      errors: Object.fromEntries(
        parsed.error.issues.map((i) => [i.path[0], i.message]),
      ) as ChangePasswordActionState["errors"],
    };
  }

  const { currentPassword, newPassword } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  });

  if (!user?.password) {
    return { apiError: "Something went wrong. Please try again." };
  }

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) {
    return { errors: { currentPassword: "Incorrect password" } };
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  return { success: true };
}
