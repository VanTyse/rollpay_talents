"use client"

import PageLoader from "@/components/general/PageLoader"
import { AuthContextProvider } from "@/lib/context/AuthContext"
import { PaperworkContextProvider } from "@/lib/context/PaperworkContext"
import { PaymentRequestContextProvider } from "@/lib/context/PaymentRequestsContext"
import { ProjectContextProvider } from "@/lib/context/ProjectContext"
import { UserDetailsContextProvider } from "@/lib/context/UserDetailsContext"
import { UtilsContextProvider } from "@/lib/context/UtilsContext"
import { ReactNode } from "react"
import { useSession } from "./auth/useSession"
import { usePathname, useRouter } from "next/navigation"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CheckAuth>
      <UtilsContextProvider>
        <AuthContextProvider>
          <ProjectContextProvider>
            <PaperworkContextProvider>
              <UserDetailsContextProvider>
                <PaymentRequestContextProvider>
                  {children}
                </PaymentRequestContextProvider>
              </UserDetailsContextProvider>
            </PaperworkContextProvider>
          </ProjectContextProvider>
        </AuthContextProvider>
      </UtilsContextProvider>
    </CheckAuth>
  )
}

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const { session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  if ((!session || !session.access) && pathname.startsWith("/app")) {
    router.push("/auth/signin")
    return <PageLoader />
  } else return children
}
