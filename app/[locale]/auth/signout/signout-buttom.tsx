"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LogOutButtons({ action }: { action: () => Promise<void> }) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col-reverse items-center gap-2 sm:flex-row">
      <Button variant="secondary" size="sm" className="w-full" onClick={() => router.back()}>
        Go back
        <span className="sr-only">Previous page</span>
      </Button>
      <Button
        size="sm"
        className="w-full"
        onClick={async () => {
          action();
        }}
      >
        Log out
        <span className="sr-only">Log out</span>
      </Button>
    </div>
  );
}
