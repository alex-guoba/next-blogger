"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { authSchema } from "@/lib/validations/auth";
import { absoluteUrl } from "@/lib/utils";

export type State =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | null;

export async function actSignUp(prevState: State | null, formData: FormData): Promise<State> {
  const supabase = createClient();

  // validate
  const result = authSchema.safeParse(formData);
  if (!result.success) {
    return {
      status: "error",
      message: "Invalid form data",
      errors: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: `Server validation: ${issue.message}`,
      })),
    };
  }

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      emailRedirectTo: absoluteUrl("auth/signup/confirm"),
    },
  });
  if (error) {
    return {
      status: "error",
      message: error.message,
      errors: [
        {
          path: "",
          message: `${error.code}: ${error.message}`,
        },
      ],
    };
  }

  // revalidate the path to ensure that the user is logged in?
  revalidatePath("/", "layout");

  return {
    status: "success",
    message: "Successfully sign up",
  };
}
