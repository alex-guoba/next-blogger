"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

import type { z } from "zod";

// import { showErrorToast } from "@/lib/handle-error"
import { authSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { PasswordInput } from "@/components/password-input";
import { toast } from "@/components/ui/use-toast";

import { actSignUp } from "./actions";

type Inputs = z.infer<typeof authSchema>;

// The useFormStatus Hook must be called from a component that is rendered inside a <form>.
function SignUpButton({ valid }: { valid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-2" disabled={pending || !valid}>
      {pending && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
      Sign up
      <span className="sr-only">Sign up</span>
    </Button>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<Inputs>({
    // https://react-hook-form.com/docs/useform#mode
    mode: "all",
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   const { toast } = useToast();
  const [state, act] = useFormState(actSignUp, null);

  React.useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status == "error") {
      toast({
        variant: "destructive",
        title: "Sigup Error",
        description: state.message,
        duration: 10000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        duration: 10000,
        title: "Sigup Success",
        description:
          "We sent you an email confirmation. Pleas check your email and click the link to verify your account.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      // router.push("/");
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
                <Input type="text" placeholder="alex@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SignUpButton valid={form.formState.isValid}></SignUpButton>
      </form>
    </Form>
  );
}
