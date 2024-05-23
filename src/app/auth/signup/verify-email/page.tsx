"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import { AuthContext } from "@/lib/context/AuthContext"
import useAxios from "@/lib/hooks/useAxios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import AuthCode from "react-auth-code-input"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export default function VerifyEmailPage() {
  const { signUpData } = useContext(AuthContext)
  const [isOTP, setIsOTP] = useState(false)
  const [otp, setOtp] = useState("")
  const handleUpdatePin = async (value: string) => {
    setOtp(value)
  }

  const router = useRouter()

  const axios = useAxios({})
  const handleVerification = async () => {
    try {
      const { data } = await axios.post(`/auth/verify/email`, {
        otp,
        otpId: signUpData?.data.otpId,
      })

      toast.success("Email verified. You can login now.")
      router.push("/auth/signin")
    } catch (error) {
      console.log(error)
    }
  }

  const resendOtp = async () => {
    setOtp("")
    try {
      const { data } = await axios.post("/auth/resend/otp", {
        email: signUpData?.data.user.email,
        phone: signUpData?.data.user.phone,
      })
      toast.success("Please check your email")
      setIsOTP(true)
    } catch (error) {
      console.log(error)
    }
  }

  if (isOTP)
    return (
      <main className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex min-h-screen flex-col overflow-auto">
          <div className="mb-12 flex justify-center p-4 md:mb-0 md:p-8">
            <Icon name="logo" />
          </div>
          <div className="flex flex-1 flex-col px-4 md:justify-center">
            <div className="mx-auto w-full max-w-[360px]">
              <div className="mx-auto w-fit">
                <Icon name="green_check" width={28} height={28} />
              </div>
              <h1
                className={
                  "mb-3 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200 md:text-4xl"
                }
              >
                Email verified
              </h1>
              <h3 className="mb-8 text-center">
                Your email has been successfully verified
              </h3>

              <Link href={"/auth/signin"}>
                <Button variant="primary" className="mb-8 w-full">
                  Continue
                </Button>
              </Link>
              <p className="text-center text-sm">
                Didn’t receive the email?{" "}
                <Button
                  variant="neutral"
                  className="mx-auto inline-block text-sm font-medium text-rp-purple-300"
                >
                  Click to resend
                </Button>
              </p>
            </div>
          </div>
          <div className="hidden items-center justify-between p-8 md:flex">
            <p>© Rollpay2023</p>
            <div className="flex items-center gap-2">
              <Icon name="envelope" />
              <p>help@rollpay.com</p>
            </div>
          </div>
        </div>
        <div className="hidden bg-rp-blue lg:block"></div>
      </main>
    )
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-screen flex-col overflow-auto">
        <div className="mb-12 flex justify-center p-4 md:mb-0 md:p-8">
          <Icon name="logo" />
        </div>
        <div className="flex flex-1 flex-col px-4 md:justify-center">
          <div className="mx-auto w-full max-w-[360px]">
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
            >
              Verify email
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
          <p>© Rollpay2023</p>
          <div className="flex items-center gap-2">
            <Icon name="envelope" />
            <p>help@rollpay.com</p>
          </div>
        </div>
      </div>
      <div className="hidden bg-rp-blue lg:block"></div>
    </main>
  )
}
