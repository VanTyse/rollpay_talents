"use client"

import { useSession } from "@/app/auth/useSession"
import Icon from "@/components/Icons/Icon"
import PasswordInput from "@/components/forms/PasswordInput"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import { AuthContext } from "@/lib/context/AuthContext"
import useAxios from "@/lib/hooks/useAxios"
import validateObject from "@/lib/utils/validateObject"
import Link from "next/link"
import { useContext, useMemo, useState } from "react"
import { toast } from "sonner"

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [values, setValues] = useState<{
    otp: string
    otpId: string
    oldPassword: string
    password: string
    confirmPassword: string
  }>({
    otp: "",
    otpId: "h",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  })

  const { userDetails } = useContext(AuthContext)
  const { logout } = useSession()

  const axios = useAxios({})

  const requestOtp = async () => {
    setOtpLoading(true)

    try {
      const { data } = await axios.post(`/auth/forgot/password/otp`, {
        email: userDetails?.email,
      })

      const otpId = data.data.otpId
      setValues((v) => ({ ...v, otpId }))
      toast.success("OTP sent!")
      setOtpLoading(false)
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? error.message ?? "")
      setOtpLoading(false)
    }
  }

  const handleResetPassword = async () => {
    const invalidatedKeys = validateObject(values, [
      "confirmPassword",
      "oldPassword",
      "otp",
      "otpId",
      "password",
    ])
    if (invalidatedKeys.length > 0) {
      invalidatedKeys.map((key) => toast.warning(`Please provide ${key}`))
      return
    }
    if (values.password !== values.confirmPassword)
      return toast.error(`new password must match confirm password`)
    try {
      const { data } = await axios.patch(`/user/password`, values)
      toast.success("Password reset successful")
      logout()
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? error.message ?? "")
      setOtpLoading(false)
    }
  }

  const isDisabled = useMemo(() => {
    const invalidatedKeys = validateObject(values, [
      "confirmPassword",
      "oldPassword",
      "otp",
      "otpId",
      "password",
    ])
    return loading || invalidatedKeys.length > 0
  }, [values, loading])

  return (
    <main
      className="bg-red fixed left-0 top-0 z-10 h-[calc(100lvh-105px)] w-dvw overflow-auto rounded-2xl bg-white px-4 py-6 md:static
        md:h-auto md:w-auto md:px-0"
    >
      <div className="relative mb-8 flex items-center md:hidden">
        <Link href={"/app/settings"}>
          <Icon name="left_arrow" />
        </Link>
        <h1 className="relative -left-4 flex-1 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Change Password
        </h1>
      </div>

      <h1 className="mb-10 max-w-[343px] text-sm md:px-4">
        Please enter your current password to change your password.
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 border-b-rp-grey-1600 pb-6 md:px-4">
          <fieldset className="basis-1/2">
            <PasswordInput
              label={"Current password"}
              value={values.oldPassword}
              onChange={(e) =>
                setValues((v) => ({ ...v, oldPassword: e.target.value }))
              }
            />
          </fieldset>

          <fieldset className="basis-1/2">
            <PasswordInput
              label={"New password"}
              value={values.password}
              onChange={(e) =>
                setValues((v) => ({ ...v, password: e.target.value }))
              }
            />
          </fieldset>
          <fieldset className="basis-1/2">
            <PasswordInput
              label={"Confirm new password"}
              value={values.confirmPassword}
              onChange={(e) =>
                setValues((v) => ({ ...v, confirmPassword: e.target.value }))
              }
            />
          </fieldset>

          <fieldset className="flex w-full basis-1/2 items-end gap-6">
            <TextInput
              label={"OTP"}
              type="text"
              required
              containerClassName="lg:col-span-9 col-span-6 flex-1"
              value={values.otp}
              onChange={(e) =>
                setValues((v) => ({ ...v, otp: e.target.value }))
              }
            />
            <Button
              variant="secondary"
              className="col-span-6 block min-w-min animate-bounce hover:animate-none hover:text-rp-primary lg:col-span-3"
              onClick={requestOtp}
              disabled={otpLoading}
            >
              Send OTP
            </Button>
          </fieldset>

          <Button
            variant="primary"
            className="mt-4 w-full"
            disabled={isDisabled}
            onClick={handleResetPassword}
          >
            Update Password
          </Button>
        </div>
      </form>
    </main>
  )
}
