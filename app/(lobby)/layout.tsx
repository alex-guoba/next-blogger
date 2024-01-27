// import { currentUser } from "@clerk/nextjs"

import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

// interface LobyLayoutProps
//   extends React.PropsWithChildren<{
//     modal: React.ReactNode
//   }> {}

export default async function LobyLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className="relative flex min-h-screen flex-col">
        {children}
    </div>
  )
}
