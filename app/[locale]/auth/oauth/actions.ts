"use server";

// import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/utils";
// import { authSchema } from "@/lib/validations/auth";
import { Provider } from "@supabase/auth-js";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function actSignInWithOAuth({ provider }: { provider: Provider }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: absoluteUrl("auth/callback", headers()),
    },
  });
  if (error) {
    redirect("/auth/error");
  }

  // revalidate the path to ensure that the user is logged in?
  revalidatePath("/", "layout");

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}
