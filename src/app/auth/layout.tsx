import PageLoader from "@/components/general/PageLoader"
import { Suspense } from "react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}
