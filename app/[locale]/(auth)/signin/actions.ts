"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { authSchema } from "@/lib/validations/auth";

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

export async function actSignIn(prevState: State | null, formData: FormData): Promise<State> {
  const supabase = createClient();

  console.log("formData:", formData);

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

  const { error } = await supabase.auth.signInWithPassword(result.data);
  if (error) {
    return {
      status: "error",
      message: "Invalid credentials",
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

  // redirect("/");
  return {
    status: "success",
    message: "Successfully sign in",
  };
}
