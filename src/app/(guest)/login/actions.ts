"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { ROUTES } from "@/src/shared/constants/routes";

const loginSchema = z.object({
  email: z.email().trim().min(1, { error: "Email is required" }),
  password: z.string().min(1, { error: "Password is required" }),
});

export type LoginActionState = {
  apiError?: string;
  errors?: {
    email?: string;
    password?: string;
  };
};

export async function loginAction(
  _prevState: LoginActionState | null,
  formData: FormData,
): Promise<LoginActionState> {
  const fields = {
    email: formData.get("email") as string,
    password: formData.get("password"),
  };

  const parsedFields = loginSchema.safeParse(fields);

  if (!parsedFields.success) {
    return {
      errors: Object.fromEntries(
        parsedFields.error.issues.map((issue) => [
          issue.path[0],
          issue.message,
        ]),
      ) as LoginActionState["errors"],
    };
  }

  const { email, password } = parsedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: ROUTES.MY_GAMES,
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { apiError: "Invalid email or password" };
      }

      return { apiError: "Login request failed. Please try again later." };
    }

    throw error;
  }
}
