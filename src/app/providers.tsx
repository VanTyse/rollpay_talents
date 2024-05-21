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
import { usePathname } from "next/navigation"
import { GoogleOAuthProvider } from "@react-oauth/google"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""
  return (
    <GoogleOAuthProvider clientId={clientId}>
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
    </GoogleOAuthProvider>
  )
}

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const { session } = useSession()
  const pathname = usePathname()

  if ((!session || !session.access) && pathname.startsWith("/app")) {
    return <PageLoader />
  } else return children
}
