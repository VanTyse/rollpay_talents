"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddPaymentDetailsPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handlePreviousNav = () => router.back()
  const handleAddPaymentDetails = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
    router.push("/app")
  }

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Icon name="directory" />
          <span className="font-space_grotesk text-rp-blue-dark text-xl font-bold">
            Creating Account...
          </span>
        </div>
      </div>
    )
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
        <div className="flex flex-1 flex-col px-4 pb-16 md:justify-center">
          <div className="mx-auto w-full lg:max-w-[370px]">
            <h1 className="font-space_grotesk text-rp-grey-200 mb-2 text-2xl font-bold tracking-[-2%] md:mb-3 md:text-4xl">
              Add payment details
            </h1>
            <h3 className="mb-8 text-sm">
              Securely add your details seamless transactions. Ensure accuracy
              to avoid errors
            </h3>
            <form onClick={(e) => e.preventDefault()}>
              <fieldset className="mb-5">
                <TextInput
                  label={"Bank Name"}
                  id="bank-name"
                  className="mb-2"
                  type="text"
                  required
                />
              </fieldset>
              <fieldset className="mb-5">
                <TextInput
                  label={"Account Holder Name"}
                  id="account-name"
                  className="mb-2"
                  type="text"
                  required
                />
              </fieldset>
              <fieldset className="mb-5">
                <TextInput
                  label={"Account Number"}
                  id="account-number"
                  className="mb-2"
                  type="text"
                  required
                />
              </fieldset>
              <fieldset className="mb-5">
                <TextInput
                  label={"Routing Number (If Applicable)"}
                  id="routing-number"
                  className="mb-2"
                  type="text"
                  required
                />
              </fieldset>
              <fieldset className="mb-5">
                <TextInput
                  label={"Tax Payer Id (Optional)"}
                  id="bank-name"
                  className="mb-2"
                  type="text"
                />
                <span className="text-xs">
                  Rollpay will file 5% with holding taxes on your behalf when
                  you receive payments
                </span>
              </fieldset>

              <Button
                variant="primary"
                className="mb-4 w-full"
                onClick={handleAddPaymentDetails}
              >
                Add bank account
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
