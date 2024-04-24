"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Link from "next/link"
import { useState } from "react"

export default function SetPasswordPage() {
  const [passwordReset, setPasswordReset] = useState(false)

  const resetPassword = () => {
    setPasswordReset(true)
  }

  if (passwordReset)
    return (
      <main className="px-4 py-12 md:py-24">
        <div className="mx-auto max-w-[360px]">
          <div className="mx-auto w-fit">
            <Icon name="green_check" width={28} height={28} />
          </div>
          <h1
            className={
              "font-space_grotesk text-rp-grey-200 mb-3 text-center text-2xl font-bold md:text-4xl"
            }
          >
            Password reset
          </h1>
          <h3 className="mb-8 text-center">
            Your password has been successfully reset. <br /> Click below to log
            in magically.
          </h3>

          <Link href={"/app"}>
            <Button variant="primary" className="mb-8 w-full font-medium">
              Continue
            </Button>
          </Link>

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
        <div className="bg-rp-grey-700 border-rp-grey-600 mx-auto mb-6 w-fit rounded-full border-[10px] p-2 text-black">
          <Icon name="key" width={28} height={28} />
        </div>
        <h1
          className={
            "font-space_grotesk text-rp-grey-200 mb-3 text-center text-2xl font-bold md:text-4xl"
          }
        >
          Password reset
        </h1>
        <h3 className="mb-8 text-center">
          Your new password must be different from previously used passwords.
        </h3>
        <form onClick={(e) => e.preventDefault()}>
          <fieldset className="mb-5 lg:mb-6">
            <TextInput
              label={"Create Password"}
              id="signup-password"
              className="mb-2"
              type="password"
              required
            />
            <span className="text-xs">
              Password must be at least 8 characters.
            </span>
          </fieldset>
          <fieldset className="mb-5 lg:mb-4">
            <TextInput
              label={"Confirm password"}
              id="signup-confirm-password"
              type="password"
              className="mb-2"
              required
            />
          </fieldset>

          <Button
            variant="primary"
            className="mb-8 w-full font-medium"
            onClick={resetPassword}
          >
            Reset Password
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
