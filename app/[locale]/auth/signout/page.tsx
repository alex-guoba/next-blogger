import type { Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import Shell from "@/components/shells/shell"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { LogOutButtons } from "./signout-buttom"

export const metadata: Metadata = {
  title: "Sign out",
  description: "Sign out of your account",
}

async function signout() {
  "use server";

  // getSession():
  // Since the unencoded session data is retrieved from the local storage medium, 
  // do not rely on it as a source of trusted data on the server. It could be tampered with by the sender. 
  // If you need verified, trustworthy user data, call getUser instead.
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  console.log("Signed out")
  redirect("/")
}

export default function SignOutPage() {

  return (
    <Shell className="max-w-md">
      <PageHeader className="text-center">
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButtons action={signout}/>
    </Shell>
  )
}
