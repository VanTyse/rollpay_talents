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
  userDetails: User | null
  updateSignUpData?: (data: SignUpData) => void
  updateSession?: UpdateSession
}

export const AuthContext = createContext<ContextType>({
  accessToken: null,
  refreshToken: null,
  signUpData: null,
  userDetails: null,
})

export interface User {
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
    user: User
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
  const [userDetails, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (session?.access) setAccessToken(session.access)
    else setAccessToken(null)
    if (session?.refresh) setRefreshToken(session.refresh)
    else setRefreshToken(null)

    if (session?.access && session?.refresh) {
      const { user } = session
      setUser(user)
    }
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
