// import { type NextRequest, NextResponse } from "next/server";

// import { createClient } from "@/lib/supabase/server";
// import { logger } from "@/lib/logger";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Shell from "@/components/shells/shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { cookies } from "next/headers";

export default async function SignupConfirmPage() {
  // const cookieStore = cookies()
  // cookieStore.getAll().map((cookie) => (
  //   console.log("acookie: ", cookie.name, cookie.value)
  // ))

  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // console.log("confirm user ", user);

  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Signup success!</CardTitle>
          {/* <CardDescription>Continue to signin</CardDescription> */}
        </CardHeader>
        {/* <CardContent className="grid">
          </CardContent> */}
      </Card>
      <Button>
        <Link href="/">Home</Link>
      </Button>
    </Shell>
  );
}
