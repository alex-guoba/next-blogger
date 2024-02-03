// import { currentUser } from "@clerk/nextjs"


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
