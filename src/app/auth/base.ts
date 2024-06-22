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

  const DURATION = 55 * 60 * 1000
  interval = setInterval(() => {
    refresh(data)
  }, DURATION)
}

const signIn = async (credentials: { email: string; password: string }) => {
  try {
    const { email, password } = credentials
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
      const redirect_path = localStorage.getItem("redirect_path")

      return { ok: true, error: false, redirect_path }
    } else {
      return { ok: false, error: "Invalid Credentials" }
    }
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

const signUp = async (credentials: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  phoneCode: string
}) => {
  try {
    const { email, password, firstName, lastName, phone, phoneCode } =
      credentials
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const raw = JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      phone,
      phoneCode,
      type: "talent",
    })

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      cache: "reload",
      credentials: "omit",
    }
    const response = await fetch(
      "https://rollpay-api.filmmakersmart.com/auth/register",
      requestOptions
    )

    const data = await response.json()

    let token_expire_date = new Date(Date.now() + 55 * 60 * 1000).toUTCString()

    const signUpData = data as SignUpData

    if (data.status == 200 || data.status == 201) {
      const sessionData = {
        user: signUpData.data.user,
        access: signUpData.data.tokens.accessToken,
        refresh: signUpData.data.tokens.refreshToken,
        token_expire_date,
      }

      saveSession(sessionData, new Date(token_expire_date))
      // await requestOtp(signUpData.data.user.email)
      return { ok: true, error: false, data }
    } else {
      return { ok: false, error: data?.message ?? "Signup failed", data: null }
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

const logout = (args?: { redirect_path?: string }) => {
  try {
    CookiesHandler.deleteCookie(cookieName)
    window.dispatchEvent(new Event(CUSTOM_EVENTS.LOGOUT))
    const redirect_path = args?.redirect_path

    if (redirect_path) localStorage.setItem("redirect_path", redirect_path)
  } catch (error) {
    console.log(error)
  }
}

const requestOtp = async (email: string) => {
  try {
    const { data } = await axios.post(`/auth/send/otp/new-email`, {
      email,
    })

    const otpId = data.data.otpId
  } catch (error: any) {
    console.log(error)
  }
}
const authController = {
  signIn,
  signUp,
  logout,
  updateUserSession,
  getSession,
  saveSession,
  refresh,
  requestOtp,
}

export default authController
