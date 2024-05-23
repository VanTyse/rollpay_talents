"use client"

import { useSession } from "@/app/auth/useSession"
import { createContext, useEffect, useMemo, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import authController, { Session } from "@/app/auth/base"

type UpdateSession = (data: Session) => void

type ContextType = {
  accessToken: string | null
  refreshToken: string | null
  signUpData: SignUpData | null
  userDetails: UserDetails | null
  updateSignUpData?: (data: SignUpData) => void
  updateSession?: UpdateSession
}

export const AuthContext = createContext<ContextType>({
  accessToken: null,
  refreshToken: null,
  signUpData: null,
  userDetails: null,
})

export interface UserDetails {
  id: string
  firstName: string
  lastName: string
  middleName: string | null
  email: string
  phoneCode: string | null
  phone: string
  avatar: string | null
  sex: "male" | "female" | null
  emailVerified: boolean
  phoneVerified: boolean
  region: string | null
  invoiceMeta: {
    slogan: string | null
    companyZip: string | null
    companyCity: string | null
    companyName: string | null
    companyEmail: string | null
    companyPhone: string | null
    companyState: string | null
    companyAddress: string | null
    companyCountry: string | null
  } | null
}

export interface SignUpData {
  status: number
  message: "Resource created"
  data: {
    user: UserDetails
    tokens: {
      accessToken: string
      refreshToken: string
    }
    otpId: string
  }
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const { session } = useSession()
  const [accessToken, setAccessToken] = useState(session?.access ?? null)
  const [refreshToken, setRefreshToken] = useState(session?.refresh ?? null)
  const [signUpData, setSignUpData] = useState<SignUpData | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  useEffect(() => {
    if (session?.access) setAccessToken(session.access)
    if (session?.refresh) setRefreshToken(session.refresh)

    if (session?.access && session?.refresh) {
      const { user } = session
      setUserDetails(user)
    }
    console.log("session =>", session)
  }, [session, session?.access])

  const updateSignUpData = (data: SignUpData) => {
    setSignUpData(data)
  }

  const updateSession = authController.updateUserSession

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        signUpData,
        userDetails,
        updateSignUpData,
        updateSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
