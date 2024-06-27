import { User, UserIdentity } from "@supabase/supabase-js";
import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

const providerIcons: Record<string, typeof Icons.google> = {
  google: Icons.google,
  github: Icons.gitHub,
  email: Icons.email,
  twitter: Icons.twitter,
};

export function ProfilePanel({ user }: { user: User }) {
  const name = user.user_metadata["user_name"] || user.email?.split("@")[0];
  const email = user.email;
  const avartar = user.user_metadata["avatar_url"] || "/static/images/avatar.jpg";
  const lastSignin = user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Unknown";
  const confirmAt = user.confirmed_at ? new Date(user.confirmed_at).toLocaleString() : "Unknown";
  const identities = user.identities;

  return (
    <Table>
      <TableCaption></TableCaption>
      {/* <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        <TableRow className="py-32">
          <TableCell className="w-[200px] font-medium">Profile</TableCell>
          <TableCell className="flex py-6 text-left">
            <Avatar className="size-12">
              {/* <AvatarImage src={user.imageUrl} alt={user.username ?? ""} /> */}
              {avartar && <AvatarImage src={avartar} alt={name ?? ""} />}
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <div className="my-auto ml-4 font-medium">{name}</div>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Email</TableCell>
          <TableCell className="flex py-6 text-left">
            <div className="my-auto ml-4">{email}</div>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Identities</TableCell>
          <TableCell className="flex py-6 text-left">
            {identities?.map((identity: UserIdentity, index: number) => {
              const Icon = providerIcons[identity.provider];
              return (
                <div key={index} className="my-auto ml-4 flex items-center" title={identity.provider}>
                  <Icon className="mr-2 size-8" aria-hidden="true"></Icon>
                  {/* {identity.provider} */}
                </div>
              );
            })}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Last Signin</TableCell>
          <TableCell className="flex py-6 text-left">
            <div className="my-auto ml-4">{lastSignin}</div>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Confirm At</TableCell>
          <TableCell className="flex py-6 text-left">
            <div className="my-auto ml-4">{confirmAt}</div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
