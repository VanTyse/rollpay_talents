"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import useAxios from "@/lib/hooks/useAxios"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const axios = useAxios({})

  

  const sendEmail = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.post("/auth/forgot/password/link", {
        email,
        url: "http://localhost:3000/auth/forgot-password/reset",
      })
      setIsLoading(false)
      setEmailSent(true)
      toast.success("Password reset link sent to your email")
    } catch (error) {
      setIsLoading(true)
      console.error(error)
    }
  }

  if (emailSent)
    return (
      <main className="px-4 py-12 md:py-24">
        <div className="mx-auto max-w-[360px]">
          <div className="mx-auto mb-6 w-fit rounded-full border-[10px] border-rp-grey-600 bg-rp-grey-700 p-2 text-black">
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
            We sent a password reset link to <br />{" "}
            <span className="font-medium">{email}</span>
          </h3>

          <Link href={"mailto:#"}>
            <Button variant="primary" className="mb-8 w-full font-medium">
              Open email app
            </Button>
          </Link>

          <p className="mb-8 text-center text-sm">
            Didn’t receive the email?{" "}
            <Button
              onClick={sendEmail}
              variant="neutral"
              className="mx-auto inline-block text-sm font-medium text-rp-blue-dark"
            >
              Click to resend
            </Button>
          </p>

          <Link href={"/auth/signin"} className="block text-center text-sm">
            <Button
              variant="neutral"
              className="mx-auto inline-flex items-center gap-2 text-sm font-medium hover:no-underline"
            >
              <Icon name="arrow_left" />
              Back to log in
            </Button>
          </Link>
        </div>
      </main>
    )
  return (
    <main className="px-4 py-12 md:py-24">
      <div className="mx-auto max-w-[360px]">
        <div className="mx-auto mb-6 w-fit rounded-full border-[10px] border-rp-grey-600 bg-rp-grey-700 p-2 text-black">
          <Icon name="key" width={28} height={28} />
        </div>
        <h1
          className={
            "mb-3 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200 md:text-4xl"
          }
        >
          Forgot Password?
        </h1>
        <h3 className="mb-8 text-center">
          No worries, we’ll send you reset instructions.
        </h3>

        <form onClick={(e) => e.preventDefault()}>
          <fieldset className="mb-6">
            <TextInput
              label={"Email"}
              id="signin-email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <Button
            variant="primary"
            className="mb-8 w-full font-medium"
            onClick={sendEmail}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </Button>
        </form>
        <p className="text-center text-sm">
          <Link href={"/auth/signin"}>
            <Button
              variant="neutral"
              className="mx-auto inline-flex items-center gap-2 text-sm font-medium hover:no-underline"
            >
              <Icon name="arrow_left" />
              Back to log in
            </Button>
          </Link>
        </p>
      </div>
    </main>
  )
}
