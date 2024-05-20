"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Link from "next/link"
import { useContext, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useAxios from "@/lib/hooks/useAxios"
import { AuthContext } from "@/lib/context/AuthContext"
import { useSession } from "../../useSession"

export default function SetPasswordPage() {
  const [passwordReset, setPasswordReset] = useState(false)
  const [values, setValues] = useState({ password: "", confirmPassword: "" })
  const searchParams = useSearchParams()
  const { updateSession } = useContext(AuthContext)
  const { session } = useSession()

  const token = searchParams.get("token")

  const [tokens, setTokens] = useState<{
    refresh: string
    access: string
  } | null>(null)

  const axios = useAxios({})
  const router = useRouter()

  const resetPassword = async () => {
    const { password, confirmPassword } = values
    try {
      const { data } = await axios.post("/auth/reset/password/link", {
        token,
        password,
        confirmPassword,
      })
      setPasswordReset(true)
      const tokens = data.data.tokens as { access: string; refresh: string }
      setTokens(tokens)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMagicalSignIn = () => {
    tokens &&
      session &&
      updateSession &&
      updateSession({ ...session, ...tokens })
    router.push("/app")
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
            <TextInput
              label={"Create Password"}
              id="signup-password"
              className="mb-2"
              type="password"
              required
              value={values.password}
              onChange={(e) =>
                setValues((v) => ({ ...v, password: e.target.value }))
              }
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
              value={values.password}
              onChange={(e) =>
                setValues((v) => ({ ...v, confirmPassword: e.target.value }))
              }
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
