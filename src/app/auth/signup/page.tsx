"use client"

import Icon from "@/components/Icons/Icon"
import PasswordInput from "@/components/forms/PasswordInput"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import { AuthContext, SignUpData } from "@/lib/context/AuthContext"
import useAxios from "@/lib/hooks/useAxios"
import validateObject from "@/lib/utils/validateObject"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useMemo, useState } from "react"
import { toast } from "sonner"
import { useSession } from "../useSession"

export default function SignUpPage() {
  const router = useRouter()

  const { signUp } = useSession()

  const { updateSignUpData } = useContext(AuthContext)
  const [values, setValues] = useState({
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
    phoneCode: "+234",
  })
  const [isLoading, setIsLoading] = useState(false)
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

  const invalidatedFields = useMemo(
    () =>
      validateObject(values, [
        "email",
        "password",
        "phone",
        "firstName",
        "lastName",
        "phoneCode",
      ]),
    [values]
  )

  const isDisabled = useMemo(
    () => isLoading || !!passwordError || invalidatedFields.length > 0,
    [isLoading, passwordError, invalidatedFields]
  )

  const handleSignUp = async () => {
    if (updateSignUpData) {
      setIsLoading(true)
      const { email, password, phone, firstName, lastName, phoneCode } = values

      if (invalidatedFields.length > 0) {
        invalidatedFields.map((f) => toast.error(`Please provide ${f}`))
        setIsLoading(false)
        return
      }

      try {
        const res = await signUp({
          email,
          firstName,
          lastName,
          password,
          phone,
          phoneCode,
        })

        updateSignUpData && res.data && updateSignUpData(res.data)

        if (res.ok) {
          router.push("/auth/signup/verify-email")
        } else {
          toast.error(res?.error)
        }
        setIsLoading(false)
      } catch (error: any) {
        setIsLoading(false)
        toast.error(
          error?.response?.data?.message ??
            error.response?.data?.error?.message ??
            error?.message
        )
      }
    }
  }
  return (
    <div className="flex min-h-screen flex-col overflow-auto">
      <div className="mb-8 p-4 md:mb-0 md:p-8">
        <Icon name="logo" />
      </div>
      <div className="flex flex-1 flex-col px-4 md:justify-center">
        <div className="mx-auto w-full lg:max-w-[360px]">
          <h1 className="mb-2 font-space_grotesk text-2xl font-bold text-rp-grey-200 md:mb-3 md:text-4xl">
            Sign Up
          </h1>
          <h3 className="mb-8">Let’s get started with your free account</h3>
          <form onClick={(e) => e.preventDefault()}>
            <fieldset className="mb-5 lg:mb-4">
              <TextInput
                label={"Email"}
                id="signup-email"
                required
                value={values.email}
                onChange={(e) =>
                  setValues((v) => ({ ...v, email: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="mb-5 lg:mb-4">
              <TextInput
                label={"Phone Number"}
                id="signup-phone"
                required
                value={values.phone}
                onChange={(e) =>
                  setValues((v) => ({ ...v, phone: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="mb-5 lg:mb-4">
              <TextInput
                label={"First Name"}
                id="signup-first-name"
                required
                value={values.firstName}
                onChange={(e) =>
                  setValues((v) => ({ ...v, firstName: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="mb-6">
              <TextInput
                label={"Last Name"}
                id="signup-last-name"
                required
                value={values.lastName}
                onChange={(e) =>
                  setValues((v) => ({ ...v, lastName: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="mb-6">
              <PasswordInput
                value={values.password}
                onChange={(e) =>
                  setValues((v) => ({ ...v, password: e.target.value }))
                }
                label={"Password"}
                id="signin-password"
                required
                error={passwordError}
              />
            </fieldset>
            <Button
              variant="primary"
              className="mb-4 w-full"
              onClick={handleSignUp}
              disabled={isDisabled}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
            {/* <Button
              variant="secondary"
              className="mb-8 w-full"
              onClick={handleSignUp}
            >
              <div className="flex items-center gap-3">
                <Icon name="googleicon" />
                <span>Continue with Google</span>
              </div>
            </Button> */}
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href={"/auth/signin"}>
                <Button
                  variant="neutral"
                  className="mx-auto inline-block text-sm"
                >
                  Log in
                </Button>
              </Link>
            </p>
          </form>
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
