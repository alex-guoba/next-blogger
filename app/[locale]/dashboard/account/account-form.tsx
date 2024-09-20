"use client";

import { useEffect } from "react";
import { profileSchema, ProfileType } from "@/lib/validations/profile";
import { Input } from "@/components/ui/input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { actUpdateProfile } from "./action";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { User } from "@supabase/supabase-js";

function UpdateButton({ valid }: { valid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-2" disabled={pending || !valid}>
      {pending && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
      Update
      <span className="sr-only">Sign up</span>
    </Button>
  );
}
export default function AccountForm({ profile, user }: { profile: ProfileType, user: User }) {
  const form = useForm<ProfileType>({
    mode: "all",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name,
      user_name: profile.user_name,
      website: profile.website,
      avatar_url: profile.avatar_url,
    },
  });

  const [state, act] = useFormState(actUpdateProfile, null);

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status == "error") {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: state.message + "." + state.errors?.[0].message,
        duration: 10000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        duration: 3000,
        title: "Update Success",
        description:
          "Your profile has been updated successfully.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      // router.push("/");
    }
  }, [state]);

  return (
    <Form {...form}>
      <form className="grid gap-4" action={act}>
        <FormField
          // control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={true} type="text" placeholder={user.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder={profile.full_name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder={profile.user_name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder={profile.website} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <UpdateButton valid={form.formState.isValid}></UpdateButton>
      </form>
    </Form>
  );
}
