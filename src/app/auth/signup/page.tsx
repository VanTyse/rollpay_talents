"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import { AuthContext, SignUpData } from "@/lib/context/AuthContext"
import useAxios from "@/lib/hooks/useAxios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

export default function SignUpPage() {
  const router = useRouter()
  const axios = useAxios({})
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
  const handleSignUp = async () => {
    if (updateSignUpData) {
      setIsLoading(true)
      const { email, password, phone, firstName, lastName, phoneCode } = values
      try {
        const { data } = await axios.post(`/auth/register`, {
          email,
          firstName,
          lastName,
          password,
          phone,
          phoneCode,
        })
        setIsLoading(false)

        const signUpData = data as SignUpData
        updateSignUpData && updateSignUpData(signUpData)

        console.log(signUpData, updateSignUpData)

        router.push("/auth/signup/verify-email")
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
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
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
              <Button
                variant="secondary"
                className="mb-8 w-full"
                onClick={handleSignUp}
              >
                <div className="flex items-center gap-3">
                  <Icon name="googleicon" />
                  <span>Continue with Google</span>
                </div>
              </Button>
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