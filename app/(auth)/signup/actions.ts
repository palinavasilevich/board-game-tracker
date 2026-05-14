"use server";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { signUpSchema } from "@/app/(auth)/signup/auth.schemas";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set.");
}
const jwtSecret = process.env.JWT_SECRET;

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

  let userId: string;
  let userEmail: string;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    userId = user.id;
    userEmail = user.email;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { apiError: "User with this email already exists", fields };
    }
    return { apiError: "Something went wrong. Please try again.", fields };
  }

  const token = jsonwebtoken.sign({ id: userId, email: userEmail }, jwtSecret, {
    expiresIn: "7d",
  });

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  redirect("/");
}
