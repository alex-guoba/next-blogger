import React from "react";

export default async function LobyLayout({ children }: { children: React.ReactNode }) {
  return <div className="relative flex min-h-[90vh] flex-col">{children}</div>;
}
