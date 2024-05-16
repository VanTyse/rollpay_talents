import BottomMavigation from "@/components/layouts/BottomNavigaiton"
import Header from "@/components/layouts/Header"
import Sidebar from "@/components/layouts/Sidebar"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid h-screen overflow-hidden bg-rp-grey-700 lg:grid-cols-[minmax(280px,18%)_1fr]">
      <Sidebar />
      <div className="overflow-y-auto p-0 lg:px-4">
        <div className="">{children}</div>
        <BottomMavigation />
      </div>
    </div>
  )
}
