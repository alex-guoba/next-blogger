"use client";

import * as React from "react";
// import { useSignIn } from "@clerk/nextjs"

// import { showErrorToast } from "@/lib/handle-error"
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Provider } from "@supabase/auth-js";
import { actSignInWithOAuth } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

// Custom if you want to add more providers
const oauthProviders = [
  // { name: "Google", strategy: "google", icon: "google" },
  { name: "Github", strategy: "github", icon: "gitHub" },
  { name: "Twitter", strategy: "twitter", icon: "twitter" },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  strategy: Provider;
}[];

export function OAuthSignIn() {
  const [loading, setLoading] = React.useState<string | null>(null);
  // const { signIn, isLoaded: signInLoaded } = useSignIn()

  async function clickSignIn(provider: Provider) {
    try {
      setLoading(provider);
      await actSignInWithOAuth({
        provider,
      });
    } catch (err) {
      setLoading(null);
      // showErrorToast(err)
      toast({
        variant: "destructive",
        title: "Sigin Error",
        description: "error",
        duration: 10000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];

        return (
          <Button
            key={provider.name}
            variant="outline"
            className="w-full bg-background"
            onClick={() => void clickSignIn(provider.strategy)}
            disabled={loading !== null}
          >
            {loading === provider.strategy ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Icon className="mr-2 size-4" aria-hidden="true" />
            )}
            {provider.name}
            <span className="sr-only">{provider.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
