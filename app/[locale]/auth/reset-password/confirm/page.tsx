//  reset your password

import { type Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Shell from "@/components/shells/shell";
import { ResetPasswordConfirmForm } from "./reset-password-confirm-form";

export const metadata: Metadata = {
  title: "Password Reset",
  description: "Reset your password",
};

export default async function ResetPasswordConfirmPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>Reset your password and confirm it</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordConfirmForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
