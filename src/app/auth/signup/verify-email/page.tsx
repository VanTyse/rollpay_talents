"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import { AuthContext } from "@/lib/context/AuthContext"
import useAxios from "@/lib/hooks/useAxios"
import errorToast from "@/lib/utils/errortoast"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import AuthCode from "react-auth-code-input"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { useSession } from "../../useSession"
import { Session } from "../../base"

export default function VerifyEmailPage() {
  const { signUpData } = useContext(AuthContext)
  const { updateSession, session } = useSession()
  const os = useSearchParams().get("os")
  const [otpId, setOtpId] = useState(signUpData?.data.otpId)

  const isOldSignUp = useMemo(() => os === "true", [os])

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const handleUpdatePin = async (value: string) => {
    setOtp(value)
  }

  const router = useRouter()

  const axios = useAxios({})
  const handleVerification = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(`/auth/verify/email`, {
        otp,
        otpId,
      })
      setLoading(false)
      toast.success("Email verified!")
      if (session) {
        const newSession: Session = {
          ...session,
          user: {
            ...session?.user,
            emailVerified: true,
          },
        }
        updateSession(newSession)
      }
      router.push("/")
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.response?.data?.error?.message ??
          error?.message ??
          "Something went wrong"
      )
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    setOtp("")
    try {
      const { data } = await axios.post("/auth/resend/otp", {
        email: signUpData?.data.user.email,
        phone: signUpData?.data.user.phone,
      })
      setOtpId(data.data.otpId)
      toast.success("OTP resent. Please check your email.")
    } catch (error: any) {
      errorToast(error, "Something went wrong with sending OTP")
    }
  }

  const sendOtp = async () => {
    setOtp("")
    try {
      const { data } = await axios.post("/auth/resend/otp", {
        email: session?.user.email,
        phone: session?.user.phone,
      })

      setOtpId(data.data.otpId)

      toast.success("Please check your email for an OTP.")
    } catch (error: any) {
      errorToast(error, "Something went wrong with sending OTP")
    }
  }

  useEffect(() => {
    if (isOldSignUp) sendOtp() // used to send an otp for signups that didn't verify with the normal flow.
  }, [isOldSignUp])

  const authContainerRef = useRef<HTMLDivElement>(null)
  const authContainer = useMemo(
    () => authContainerRef.current,
    [authContainerRef.current, authContainerRef]
  )

  useEffect(() => {
    if (!authContainer) return
    const keyboardlistener = (e: KeyboardEvent) => {
      if (e.key === "Enter" && otp.length === 6) {
        handleVerification()
      }
    }

    authContainer.addEventListener("keyup", keyboardlistener)
  }, [authContainer, otp])

  return (
    <div className="flex min-h-screen flex-col overflow-auto">
      <div className="mb-12 flex justify-center p-4 md:mb-0 md:p-8">
        <Icon name="logo" />
      </div>
      <div className="flex flex-1 flex-col px-4 md:justify-center">
        <div className="mx-auto w-full max-w-[360px]" ref={authContainerRef}>
          <div className="mx-auto w-fit rounded-full border-[10px] border-rp-grey-600 bg-rp-grey-500 p-2 text-black">
            <Icon name="envelope" width={28} height={28} />
          </div>
          <h1
            className={
              "mb-3 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200 md:text-4xl"
            }
          >
            Check your email
          </h1>
          <h3 className="mb-8 text-center">
            We sent a verification link to {signUpData?.data?.user?.email}
          </h3>
          <AuthCode
            ariaLabel="transaction pin"
            isPassword={false}
            containerClassName={twMerge(
              "flex items-center justify-center lg:gap-3 mb-8 max-w-[250px] md:max-w-none mx-auto gap-2"
            )}
            length={6}
            disabled={false}
            inputClassName={
              "rounded-lg text-center mx-auto border border-rp-purple-100 focus:border-4 focus:border-rp-purple-200 w-12 lg:w-16 aspect-square h-12 lg:h-16 focus:outline-none flex items-center justify-center text-rp-blue-dark text-4xl lg:text-3xl"
            }
            onChange={handleUpdatePin}
          />
          <Button
            variant="primary"
            className="mb-8 w-full"
            onClick={handleVerification}
            disabled={otp.length !== 6 || loading}
          >
            {loading ? "Loading..." : "Verify email"}
          </Button>
          <p className="text-center text-sm">
            Didn’t receive the email?{" "}
            <Button
              variant="neutral"
              className="mx-auto inline-block text-sm font-medium text-rp-purple-300"
              onClick={resendOtp}
            >
              Click to resend
            </Button>
          </p>
        </div>
      </div>
      <div className="hidden items-center justify-between p-8 md:flex">
        <a href="https://www.rollpay.app/privacy-policy" target="_blank">
          Terms
        </a>
        <div className="flex items-center gap-2">
          <Icon name="envelope" />
          <a href="mailto:info@rollpay.app">info@rollpay.app</a>
        </div>
      </div>
    </div>
  )
}
