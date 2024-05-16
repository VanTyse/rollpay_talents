"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { createContext, useEffect, useMemo, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Session } from "next-auth"

type UpdateSession = (data?: any) => Promise<Session | null>

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

interface UserDetails {
  id: string
  firstName: string
  lastName: string
  middleName: string | null
  email: string
  phoneCode: string | null
  phone: string
  avatar: string | null
  sex: null
  emailVerified: boolean
  phoneVerified: boolean
  region: null
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
  const { data: session, update: updateSession } = useSession()
  const [accessToken, setAccessToken] = useState(session?.access ?? null)
  const [refreshToken, setRefreshToken] = useState(session?.refresh ?? null)
  const [signUpData, setSignUpData] = useState<SignUpData | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  useEffect(() => {
    if (session?.access) setAccessToken(session.access)
    if (session?.refresh) setRefreshToken(session.refresh)

    if (session?.access && session?.refresh) {
      const { access, refresh, ...userDetails } = session
      setUserDetails(userDetails as unknown as UserDetails)
    }
    // console.log("session =>", session)
  }, [session])

  const updateSignUpData = (data: SignUpData) => {
    setSignUpData(data)
  }

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
