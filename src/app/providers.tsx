"use client"

import PageLoader from "@/components/general/PageLoader"
import { AuthContextProvider } from "@/lib/context/AuthContext"
import { PaperworkContextProvider } from "@/lib/context/PaperworkContext"
import { PaymentRequestContextProvider } from "@/lib/context/PaymentRequestsContex"
import { ProjectContextProvider } from "@/lib/context/ProjectContext"
import { UserDetailsContextProvider } from "@/lib/context/UserDetailsContext"
import { UtilsContextProvider } from "@/lib/context/UtilsContext"
import { SessionProvider, useSession } from "next-auth/react"
import { ReactNode } from "react"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
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
    </SessionProvider>
  )
}

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const { status, data } = useSession({ required: false })

  if (status === "loading") return <PageLoader />
  else return children
}
