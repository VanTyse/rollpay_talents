"use client"

import PageLoader from "@/components/general/PageLoader"
import { AuthContextProvider } from "@/lib/context/AuthContext"
import { PaperworkContextProvider } from "@/lib/context/PaperworkContext"
import { PaymentRequestContextProvider } from "@/lib/context/PaymentRequestsContext"
import { ProjectContextProvider } from "@/lib/context/ProjectContext"
import { UserDetailsContextProvider } from "@/lib/context/UserDetailsContext"
import { UtilsContextProvider } from "@/lib/context/UtilsContext"
import { ReactNode, useEffect, useState } from "react"
import { useSession } from "./auth/useSession"
import { usePathname } from "next/navigation"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { InvoiceContextProvider } from "@/lib/context/InvoiceContext"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UtilsContextProvider>
        <AuthContextProvider>
          <ProjectContextProvider>
            <InvoiceContextProvider>
              <PaperworkContextProvider>
                <UserDetailsContextProvider>
                  <PaymentRequestContextProvider>
                    {children}
                  </PaymentRequestContextProvider>
                </UserDetailsContextProvider>
              </PaperworkContextProvider>
            </InvoiceContextProvider>
          </ProjectContextProvider>
        </AuthContextProvider>
      </UtilsContextProvider>
    </GoogleOAuthProvider>
  )
}
