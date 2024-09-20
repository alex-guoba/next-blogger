import { getCacheUser } from "@/lib/supabase/user";
import AccountForm from "./account-form";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileType } from "@/lib/validations/profile";
import Shell from "@/components/shells/shell";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";

export default async function Account() {
  const user = await getCacheUser();
  if (!user) {
    redirect("/login");
  }

  const supabase = createClient();

  const { data, error, status } = await supabase
    .from("profiles")
    .select(`full_name, user_name, website, avatar_url`)
    .eq("id", user?.id)
    .single();

  // 406: More than 1 or no items where returned when requesting a singular response
  if (error && status !== 406) {
    console.log(error, status);
    return redirect("/error");
  }

  const profile: ProfileType = {
    full_name: data?.full_name,
    user_name: data?.user_name || "",
    website: data?.website || "",
    avatar_url: data?.avatar_url || "",
  }
  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading size="sm">Account settings</PageHeaderHeading>
        {/* <PageHeaderDescription size="sm">
          Manage your settings
        </PageHeaderDescription> */}
      </PageHeader>
      <AccountForm profile={profile} user={user}/>;
    </Shell>
  )

  
}
