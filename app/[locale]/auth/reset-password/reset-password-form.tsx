"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { checkEmailSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { useFormState, useFormStatus } from "react-dom";

import { actResetPasswrod } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

type Inputs = z.infer<typeof checkEmailSchema>;

function ResetPasswordButton({ valid }: { valid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-2" disabled={pending || !valid}>
      {pending && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
      Continue to reset password
      <span className="sr-only">Sign up</span>
    </Button>
  );
}

export function ResetPasswordForm() {
  const router = useRouter();
  // react-hook-form
  const form = useForm<Inputs>({
    mode: "all",
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const [state, act] = useFormState(actResetPasswrod, null);

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
        description: "Please check your email for a password reset link to log in.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      //   router.push("/");
    }
  }, [router, state]);

  return (
    <Form {...form}>
      <form className="grid gap-4" action={act}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="alex@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ResetPasswordButton valid={form.formState.isValid}></ResetPasswordButton>
      </form>
    </Form>
  );
}
