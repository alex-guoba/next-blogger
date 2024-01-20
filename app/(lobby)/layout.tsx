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
//   const user = await currentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
