import Script from "next/script"

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
