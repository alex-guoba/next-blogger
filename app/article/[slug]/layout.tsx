export default function ArticleLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        {/* Include shared UI here e.g. a header or sidebar */}
        {/* <seciton className="w-full flex-none md:w-64">
          <SideNav />
        </seciton> */}
   
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    )
  }