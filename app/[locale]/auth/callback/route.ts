// import { cookies } from 'next/headers'
import { NextResponse } from "next/server";
// import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { createClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/utils";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/dashboard/profile";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(absoluteUrl(next, headers()));
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(absoluteUrl("auth/auth-code-error", headers()));
}
