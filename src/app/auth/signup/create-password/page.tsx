"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreatePasswordPage() {
  const router = useRouter()
  const handlePreviousNav = () => router.back()
  const handleCreatePassword = () => {
    router.push("/auth/signup/payment-details")
  }
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-screen flex-col overflow-auto">
        <div
          className="block w-fit cursor-pointer p-4 md:hidden"
          onClick={handlePreviousNav}
        >
          <Icon name="arrow_left" width={24} height={32} />
        </div>
        <div className="mb-4 p-4 md:mb-0 md:p-8">
          <Icon name="logo" />
        </div>
        <div className="flex flex-1 flex-col px-4 md:justify-center">
          <div className="mx-auto w-full lg:max-w-[360px]">
            <h1 className="font-space_grotesk text-rp-grey-200 mb-2 text-2xl font-bold md:mb-3 md:text-4xl">
              Create Password
            </h1>
            <h3 className="mb-8 text-sm">
              Choose a strong password to protect your account
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
                  Password must be at least 8 characters long
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
                <span className="text-xs">Both passwords must match</span>
              </fieldset>

              <Button
                variant="primary"
                className="mb-4 w-full"
                onClick={handleCreatePassword}
              >
                Done
              </Button>
            </form>
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
