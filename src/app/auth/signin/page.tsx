"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { useSession } from "../useSession"
import useAxios from "@/lib/hooks/useAxios"
import newAxios from "axios"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import PasswordInput from "@/components/forms/PasswordInput"
import FadeImagesLoop from "@/components/general/FadeImagesInLoop"

export interface ISignIn {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const [values, setValues] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useSession()
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { data } = await newAxios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/login`,
          {
            token: codeResponse.access_token,
          }
        )
        // setTimeout(() => googleLogout(), 5000)
      } catch (error) {
        console.log(error)
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  })

  const handleSignIn = async () => {
    const { email, password } = values
    setIsLoading(true)
    try {
      const res = await signIn({
        email,
        password,
      })

      if (res?.ok) {
        router.push("/")
        setIsLoading(false)
      } else {
        toast.error(res?.error)
        setIsLoading(false)
      }
    } catch (error: any) {
      setIsLoading(false)
      console.log(error)
      toast.error(error.message)
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
                <PasswordInput
                  value={values.password}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, password: e.target.value }))
                  }
                  label={"Password"}
                  id="signin-password"
                  required
                />
              </fieldset>
              <Button
                type="submit"
                variant="primary"
                className="mb-4 w-full"
                disabled={isLoading}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                className="mb-8 w-full"
                onClick={() => loginWithGoogle()}
              >
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
          <a href="https://www.rollpay.app/privacy-policy" target="_blank">
            Terms
          </a>
          <div className="flex items-center gap-2">
            <Icon name="envelope" />
            <a href="mailto:info@rollpay.app">info@rollpay.app</a>
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center bg-rp-blue lg:flex">
        <FadeImagesLoop
          images={[
            "/images/auth_image_1.png",
            "/images/auth_image_2.png",
            "/images/auth_image_3.png",
            "/images/auth_image_4.png",
            "/images/auth_image_5.png",
            "/images/auth_image_6.png",
          ]}
          fade={false}
          intervalDuration={1500}
        />
      </div>
    </main>
  )
}
