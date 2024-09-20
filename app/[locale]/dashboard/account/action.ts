"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/validations/profile";
import { getCacheUser } from "@/lib/supabase/user";

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

export async function actUpdateProfile(prevState: State | null, formData: FormData): Promise<State> {
  const user = await getCacheUser();
  if (!user) {
    return {
        status: "error",
        message: "You are not logged in",
    };
  }
  const supabase = createClient();

  // validate
  const data = profileSchema.safeParse(formData);
  if (!data.success) {
    return {
      status: "error",
      message: "Invalid form data",
      errors: data.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: `Server validation: ${issue.message}`,
      })),
    };
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: data.data.full_name,
    user_name: data.data.user_name,
    website: data.data.website,
    updated_at: new Date().toISOString(),
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
  revalidatePath("/dashboard", "page");

  return {
    status: "success",
    message: "Successfully sign up",
  };
}
