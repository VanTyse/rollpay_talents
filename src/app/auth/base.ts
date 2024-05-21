"use client"

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

let interval: ReturnType<typeof setInterval>

const saveSession = (data: Session, expires: Date) => {
  if (interval) clearInterval(interval)
  CookiesHandler.setCookie(cookieName, JSON.stringify(data), { expires })
  window.dispatchEvent(new Event(CUSTOM_EVENTS.UPDATE_SESSION))

  const DURATION = 1000
  interval = setInterval(() => {}, DURATION)
}

const signIn = async (credentials: { email: string; password: string }) => {
  try {
    const { email, password } = credentials
    const api = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const raw = JSON.stringify({
      email,
      password,
    })

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      cache: "reload",
      credentials: "omit",
    }
    const response = await fetch(
      "https://rollpay-api.filmmakersmart.com/auth/login",
      requestOptions
    )

    const data = await response.json()

    let token_expire_date = new Date(Date.now() + 55 * 60 * 1000).toUTCString()

    const signInData = data as SignUpData

    if (data.status == 200 || data.status == 201) {
      const sessionData = {
        user: signInData.data.user,
        access: signInData.data.tokens.accessToken,
        refresh: signInData.data.tokens.refreshToken,
        token_expire_date,
      }

      saveSession(sessionData, new Date(token_expire_date))
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
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const raw = JSON.stringify({ refreshToken: refresh })

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      cache: "reload",
      credentials: "omit",
    }
    const res = await fetch(api, requestOptions)

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
