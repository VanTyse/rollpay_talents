"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Link from "next/link"
import { useContext, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useAxios from "@/lib/hooks/useAxios"
import { AuthContext, User } from "@/lib/context/AuthContext"
import { useSession } from "../../useSession"
import PasswordInput from "@/components/forms/PasswordInput"
import { toast } from "sonner"
import errorToast from "@/lib/utils/errortoast"
import { Session } from "../../base"

export default function SetPasswordPage() {
  const [passwordReset, setPasswordReset] = useState(false)
  const [values, setValues] = useState({ password: "", confirmPassword: "" })
  const searchParams = useSearchParams()
  const { updateSession } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [newSession, setNewSession] = useState<Session | null>(null)
  const { session } = useSession()

  const token = searchParams.get("token")
  const axios = useAxios({})
  const router = useRouter()

  const passwordError = useMemo(() => {
    const { password } = values
    if (password) {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/

      if (!passwordRegex.test(password)) {
        return {
          message: `Password must contain at least one uppercase letter, one lowercase
            letter, one digit, and a special character. It must be at least 8 characters`,
        }
      }
      return null
    }
  }, [values.password])

  const confirmPasswordError = useMemo(() => {
    const { password, confirmPassword } = values
    if (confirmPassword) {
      if (!password) {
        return {
          message: "Please fill password input above",
        }
      } else {
        if (password !== confirmPassword)
          return {
            message: "Passwords must match",
          }
      }
    }
  }, [values.confirmPassword, values.password])

  const resetPassword = async () => {
    const { password, confirmPassword } = values
    if (password !== confirmPassword) return toast.error("Passwords must match")
    setIsLoading(true)
    try {
      const { data } = await axios.post("/auth/reset/password/link", {
        token,
        password,
        confirmPassword,
      })
      setPasswordReset(true)
      const tokens = data.data.tokens as {
        accessToken: string
        refreshToken: string
      }
      const user = data.data.user as User
      let token_expire_date = new Date(
        Date.now() + 55 * 60 * 1000
      ).toUTCString()

      setNewSession({
        user: { ...user },
        access: tokens.accessToken,
        refresh: tokens.refreshToken,
        token_expire_date,
      })
      setIsLoading(false)
    } catch (error) {
      errorToast(error, "Couldn't reset password")
      setIsLoading(false)
    }
  }

  const handleMagicalSignIn = () => {
    toast.success("signing in")
    newSession && updateSession && updateSession({ ...newSession })
  }

  useEffect(() => {
    if (
      session &&
      session.access &&
      new Date(session.token_expire_date) > new Date()
    )
      router.push("/app")
  }, [session])

  if (passwordReset)
    return (
      <main className="px-4 py-12 md:py-24">
        <div className="mx-auto max-w-[360px]">
          <div className="mx-auto w-fit">
            <Icon name="green_check" width={28} height={28} />
          </div>
          <h1
            className={
              "mb-3 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200 md:text-4xl"
            }
          >
            Password reset
          </h1>
          <h3 className="mb-8 text-center">
            Your password has been successfully reset. <br /> Click below to log
            in magically.
          </h3>

          <Button
            variant="primary"
            className="mb-8 w-full font-medium"
            onClick={handleMagicalSignIn}
          >
            Continue
          </Button>

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
          Password reset
        </h1>
        <h3 className="mb-8 text-center">
          Your new password must be different from previously used passwords.
        </h3>
        <form onClick={(e) => e.preventDefault()}>
          <fieldset className="mb-5 lg:mb-6">
            <PasswordInput
              label={"Create Password"}
              id="signup-password"
              className="mb-2"
              type="password"
              required
              value={values.password}
              onChange={(e) =>
                setValues((v) => ({ ...v, password: e.target.value }))
              }
              error={passwordError}
            />
            {/* <span className="text-xs">
              Password must contain at least one uppercase letter, one lowercase
              letter, one digit, and a special character. <br /> It must be at
              least 8 characters
            </span> */}
          </fieldset>
          <fieldset className="mb-5 lg:mb-4">
            <PasswordInput
              label={"Confirm password"}
              id="signup-confirm-password"
              type="password"
              className="mb-2"
              required
              value={values.confirmPassword}
              onChange={(e) =>
                setValues((v) => ({ ...v, confirmPassword: e.target.value }))
              }
              error={confirmPasswordError}
            />
          </fieldset>

          <Button
            variant="primary"
            className="mb-8 w-full font-medium"
            onClick={resetPassword}
            disabled={isLoading}
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
