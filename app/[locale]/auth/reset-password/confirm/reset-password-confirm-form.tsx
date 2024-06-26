"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { resetPasswordSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { useFormState, useFormStatus } from "react-dom";

import { actResetPasswrodConfirm } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { PasswordInput } from "@/components/password-input";

type Inputs = z.infer<typeof resetPasswordSchema>;

function ResetPasswordConfirmButton({ valid }: { valid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-2" disabled={pending || !valid}>
      {pending && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
      Reset Password
      <span className="sr-only">Reset Password</span>
    </Button>
  );
}

export function ResetPasswordConfirmForm() {
  const router = useRouter();
  // react-hook-form
  const form = useForm<Inputs>({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [state, act] = useFormState(actResetPasswrodConfirm, null);

  React.useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status == "error") {
      toast({
        variant: "destructive",
        title: "Reset password Error",
        description: state.message,
        duration: 10000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        duration: 10000,
        title: "Reset Success",
        description: "Reset success.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });

      router.push("/auth/signin");
    }
  }, [router, state]);

  return (
    <Form {...form}>
      <form className="grid gap-4" action={act}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ResetPasswordConfirmButton valid={form.formState.isValid}></ResetPasswordConfirmButton>

        {/* <Button className="mt-2" disabled={loading}>
          {loading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">
            Continue to reset password verification
          </span>
        </Button> */}
      </form>
    </Form>
  );
}
