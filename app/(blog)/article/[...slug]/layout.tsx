// import Script from "next/script"
import React from "react";


export default async function LobyLayout({ children }: { children: React.ReactNode }) {
  return <div className="relative flex min-h-screen flex-col">{children}</div>;
}
