"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CopyToClipboard({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch (error) {
      console.error("Error copying to clipboard", error);
    } finally {
      setTimeout(() => {
        // do something
        setIsCopied(false);
      }, 1000);
    }
  };

  return <Button onClick={copyToClipboard}>{isCopied ? "Copied!" : "Copy"}</Button>;
}
