import { redirect } from "next/navigation";

import { getCacheUser } from "@/lib/supabase/user";
import Shell from "@/components/shells/shell";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { ProfilePanel } from "../_components/profile-panel";

export default async function PrivatePage() {
  const user = await getCacheUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading size="sm">Profile details</PageHeaderHeading>
        {/* <PageHeaderDescription size="sm">
          Manage your settings
        </PageHeaderDescription> */}
      </PageHeader>
      <ProfilePanel user={user}></ProfilePanel>
    </Shell>
  );
}
