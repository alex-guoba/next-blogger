// import Script from "next/script"
import React from "react";

import "simplebar-react/dist/simplebar.min.css";

export default async function LobyLayout({ children }: { children: React.ReactNode }) {
  return <div className="relative flex min-h-screen flex-col">{children}</div>;
}
