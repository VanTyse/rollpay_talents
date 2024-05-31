import { useEffect, useState } from "react"

import { CUSTOM_EVENTS } from "@/lib/constants"
import AuthController, { Session } from "./base"
import { usePathname, useRouter } from "next/navigation"
import { SignUpData } from "@/lib/context/AuthContext"

interface ReturnType {
  session: Session | null
  updateSession: (session: Session) => void
  signIn: (credentials: {
    email: string
    password: string
  }) => Promise<{ ok: boolean; error: string | boolean }>
  signUp: (credentials: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string
    phoneCode: string
  }) => Promise<{
    ok: boolean
    error: string | boolean
    data: SignUpData | null
  }>
  logout: () => void
}

export const useSession = (): ReturnType => {
  const [session, setSession] = useState(() => AuthController.getSession())
  const signIn = AuthController.signIn
  const signUp = AuthController.signUp
  const logout = AuthController.logout
  const updateSession = AuthController.updateUserSession
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if ((!session || !session.access) && !pathname.startsWith("/auth")) logout()
  }, [session])

  useEffect(() => {
    setSession(AuthController.getSession())
  }, [pathname])

  useEffect(() => {
    const handleEventChange = () => {
      const sessionData = AuthController.getSession()
      setSession(sessionData)
    }

    window.addEventListener(CUSTOM_EVENTS.UPDATE_SESSION, handleEventChange)

    return () => {
      window.removeEventListener(
        CUSTOM_EVENTS.UPDATE_SESSION,
        handleEventChange
      )
    }
  }, [pathname])

  useEffect(() => {
    const handleLogoutEventChange = () => {
      const sessionData = AuthController.getSession()
      setSession(sessionData)
      if (!pathname.startsWith("/auth")) router.push("/auth/signin")
    }

    window.addEventListener(CUSTOM_EVENTS.LOGOUT, handleLogoutEventChange)

    return () => {
      window.removeEventListener(CUSTOM_EVENTS.LOGOUT, handleLogoutEventChange)
    }
  }, [])

  return { session, signIn, logout, updateSession, signUp }
}
