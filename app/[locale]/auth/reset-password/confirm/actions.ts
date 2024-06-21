"use server";

import { createClient } from "@/lib/supabase/server";
import { resetPasswordSchema } from "@/lib/validations/auth";

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

export async function actResetPasswrodConfirm(prevState: State | null, formData: FormData): Promise<State> {
  const supabase = createClient();

  // validate
  const result = resetPasswordSchema.safeParse(formData);
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

  const { data, error } = await supabase.auth.updateUser({
    password: result.data.password
  });

  console.log(data.user, error);
  
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
  // revalidatePath("/", "layout");

  return {
    status: "success",
    message: "Successfully reset password",
  };
}
