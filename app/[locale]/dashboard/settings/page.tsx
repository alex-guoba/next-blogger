import { redirect } from "next/navigation";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { getCacheUser } from "@/lib/supabase/user";
import Shell from "@/components/shells/shell";

export default async function PrivatePage() {
  const user = await getCacheUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading size="sm">Settings</PageHeaderHeading>
        {/* <PageHeaderDescription size="sm">
      Manage your settings
    </PageHeaderDescription> */}
      </PageHeader>
    </Shell>
  );
}
