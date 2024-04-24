"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Link from "next/link"
import { useState } from "react"
import AuthCode from "react-auth-code-input"
import { twMerge } from "tailwind-merge"

export default function VerifyEmailPage() {
  const [isOTP, setIsOTP] = useState(false)
  const [otp, setOtp] = useState("")
  const handleUpdatePin = async (value: string) => {
    setOtp(value)
  }

  const handleVerification = () => {
    setIsOTP(true)
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
                  "font-space_grotesk text-rp-grey-200 mb-3 text-center text-2xl font-bold md:text-4xl"
                }
              >
                Email verified
              </h1>
              <h3 className="mb-8 text-center">
                Your email has been successfully verified
              </h3>

              <Link href={"/auth/signup/create-password"}>
                <Button variant="primary" className="mb-8 w-full">
                  Continue
                </Button>
              </Link>
              <p className="text-center text-sm">
                Didn’t receive the email?{" "}
                <Button
                  variant="neutral"
                  className="text-rp-purple-300 mx-auto inline-block text-sm font-medium"
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
            <div className="bg-rp-grey-500 border-rp-grey-600 mx-auto w-fit rounded-full border-[10px] p-2 text-black">
              <Icon name="envelope" width={28} height={28} />
            </div>
            <h1
              className={
                "font-space_grotesk text-rp-grey-200 mb-3 text-center text-2xl font-bold md:text-4xl"
              }
            >
              Check your email
            </h1>
            <h3 className="mb-8 text-center">
              We sent a verification link to olivia@gmail.com
            </h3>
            <AuthCode
              ariaLabel="transaction pin"
              isPassword={false}
              containerClassName={twMerge(
                "flex items-center justify-center lg:gap-3 mb-8 max-w-[250px] md:max-w-none mx-auto gap-2"
              )}
              length={4}
              disabled={false}
              inputClassName={
                "rounded-lg text-center mx-auto border border-rp-purple-100 focus:border-4 focus:border-rp-purple-200 w-14 lg:w-20 h-14 lg:h-20 focus:outline-none flex items-center justify-center text-rp-blue-dark text-4xl lg:text-5xl"
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
                className="text-rp-purple-300 mx-auto inline-block text-sm font-medium"
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
