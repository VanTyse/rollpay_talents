"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export interface ISignIn {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const [values, setValues] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const handleSignIn = async () => {
    const { email, password } = values
    setIsLoading(true)
    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
        type: "admin",
      })

      console.log(res)

      if (res?.ok) {
        router.push(res.url!)
        setIsLoading(false)
      } else {
        toast.error(res?.error)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-screen flex-col overflow-auto">
        <div className="mb-8 p-4 md:mb-0 md:p-8">
          <Icon name="logo" />
        </div>
        <div className="flex flex-1 flex-col px-4 md:justify-center">
          <div className="mx-auto w-full lg:max-w-[360px]">
            <h1
              className={
                "mb-2 font-space_grotesk text-2xl font-bold text-rp-grey-200 md:mb-3 md:text-4xl"
              }
            >
              Sign In
            </h1>
            <h3 className="mb-8">Welcome back</h3>
            <form onClick={(e) => e.preventDefault()}>
              <fieldset className="mb-5 lg:mb-4">
                <TextInput
                  label={"Email"}
                  id="signin-email"
                  required
                  onChange={(e) =>
                    setValues((v) => ({ ...v, email: e.target.value }))
                  }
                />
              </fieldset>
              <fieldset className="mb-6">
                <TextInput
                  value={values.password}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, password: e.target.value }))
                  }
                  label={"Password"}
                  type="password"
                  id="signin-password"
                  required
                />
              </fieldset>
              <Button
                variant="primary"
                className="mb-4 w-full"
                disabled={isLoading}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button variant="secondary" className="mb-8 w-full">
                <div className="flex items-center gap-3">
                  <Icon name="googleicon" />
                  <span>Continue with Google</span>
                </div>
              </Button>
              <Link href={"/auth/forgot-password"}>
                <Button
                  variant="neutral"
                  className="mx-auto mb-8 block text-sm"
                >
                  Forgot Password
                </Button>
              </Link>
              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link href={"/auth/signup"}>
                  <Button
                    variant="neutral"
                    className="mx-auto inline-block text-sm"
                  >
                    Create Account
                  </Button>
                </Link>
              </p>
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
