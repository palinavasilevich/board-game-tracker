"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/src/lib/db";
import { Prisma } from "@/src/lib/generated/prisma/client";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { ROUTES } from "@/src/shared/constants/routes";

const signUpSchema = z
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

export type SignUpActionState = {
  apiError?: string;
  fields?: {
    name?: string;
    email?: string;
  };
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export async function signupAction(
  _prevState: SignUpActionState | null,
  formData: FormData,
): Promise<SignUpActionState> {
  const fields = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  };

  const parsedFields = signUpSchema.safeParse({
    ...fields,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsedFields.success) {
    return {
      fields,
      errors: Object.fromEntries(
        parsedFields.error.issues.map((issue) => [
          issue.path[0],
          issue.message,
        ]),
      ) as SignUpActionState["errors"],
    };
  }

  const { name, email, password } = parsedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { apiError: "User with this email already exists", fields };
    }
    return { apiError: "Something went wrong. Please try again.", fields };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: ROUTES.MY_GAMES,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      return {
        apiError: "Account created but login failed. Please sign in manually.",
        fields: { name, email },
      };
    }
    throw e;
  }

  return {};
}
