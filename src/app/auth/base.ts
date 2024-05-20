import CookiesHandler from "@/app/auth/cookie-handler"
import { CUSTOM_EVENTS } from "@/lib/constants"
import { SignUpData } from "@/lib/context/AuthContext"
import axios from "axios"

import { useRouter } from "next/navigation"

interface User {
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
}

export interface Session {
  user: User
  access: string
  refresh: string
  token_expire_date: string
}

const cookieName = "sb_host_am"

const saveSession = (data: Session) => {
  CookiesHandler.setCookie(cookieName, JSON.stringify(data))
  window.dispatchEvent(new Event(CUSTOM_EVENTS.UPDATE_SESSION))
}

const signIn = async (credentials: { email: string; password: string }) => {
  try {
    const { email, password } = credentials
    const api = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`

    const { data } = await axios.post(api, { email, password })
    let token_expire_date = new Date(Date.now() + 55 * 60 * 1000).toUTCString()

    const signInData = data as SignUpData

    if (data.status == 200 || data.status == 201) {
      const sessionData = {
        user: signInData.data.user,
        access: signInData.data.tokens.accessToken,
        refresh: signInData.data.tokens.refreshToken,
        token_expire_date,
      }

      saveSession(sessionData)
      return { ok: true, error: false }
    } else {
      return { ok: false, error: "Invalid Credentials" }
    }
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

const getSession = (): Session | null => {
  const response = CookiesHandler.getCookie(cookieName)

  if (!response) return null
  const sessionData = JSON.parse(response) as Session
  return sessionData
}

const refresh = async (session: Session) => {
  const { refresh } = session
  try {
    const api = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh/token`

    const res = await fetch(api, {
      method: "POST",
      body: JSON.stringify({ refreshToken: refresh }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    const response = await res.json()
    const newAccessToken = response.data.accessToken

    const sessionData = {
      ...session,
      access: newAccessToken,
    }

    updateUserSession(sessionData)
  } catch (error: any) {
    logout()
    throw new Error(`An error occured:${error.message}`)
  }
}

const updateUserSession = (session: Session) => {
  //to simplify things just pass the already mofified session to this function
  CookiesHandler.setCookie(cookieName, JSON.stringify(session))
  window.dispatchEvent(new Event(CUSTOM_EVENTS.UPDATE_SESSION))
}

const logout = () => {
  try {
    CookiesHandler.deleteCookie(cookieName)
    window.dispatchEvent(new Event(CUSTOM_EVENTS.LOGOUT))
  } catch (error) {
    console.log(error)
  }
}

const authController = {
  signIn,
  logout,
  updateUserSession,
  getSession,
  saveSession,
  refresh,
}

export default authController
