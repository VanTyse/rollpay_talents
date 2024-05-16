"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import { UserDetailsContext } from "@/lib/context/UserDetailsContext"
import useAxios from "@/lib/hooks/useAxios"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { toast } from "sonner"

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false)
  const { userAccount } = useContext(UserDetailsContext)
  const [values, setValues] = useState({
    accountNumber: userAccount?.accountNumber,
    accountName: userAccount?.accountName,
    bankName: userAccount?.bankName,
    tin: "",
  })

  useEffect(() => {
    if (userAccount)
      setValues({
        accountNumber: userAccount?.accountNumber,
        accountName: userAccount?.accountName,
        bankName: userAccount?.bankName,
        tin: "",
      })
  }, [userAccount])

  const axios = useAxios({})
  const handleUpateAccountDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.patch("/user/user-account", { ...values })
      toast.success("Account details updated successfully")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <main
      className="bg-red fixed left-0 top-0 z-10 h-[calc(100lvh-105px)] w-dvw overflow-auto rounded-2xl bg-white px-4 py-6 md:static
        md:h-auto md:w-auto md:px-0"
    >
      <div className="relative mb-8 flex items-center md:hidden">
        <Link href="/app/settings" className="z-10">
          <Icon name="left_arrow" />
        </Link>
        <h1 className="relative -left-6 flex-1 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Payment
        </h1>
      </div>

      <h1 className="mb-10 text-sm md:px-4">
        Please confirm that your payment details are correct
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 border-b-rp-grey-1600 pb-6 md:px-4">
          <fieldset className="basis-1/2">
            <TextInput
              label={"Account Number"}
              type="text"
              className="text-rp-grey-1100"
              value={values.accountNumber}
              onChange={(e) =>
                setValues((v) => ({ ...v, accountNumber: e.target.value }))
              }
            />
          </fieldset>

          <fieldset className="basis-1/2">
            <TextInput
              label={"Account Name"}
              type="text"
              className="text-rp-grey-1100"
              value={values.accountName}
              onChange={(e) =>
                setValues((v) => ({ ...v, accountName: e.target.value }))
              }
            />
          </fieldset>
          <fieldset className="basis-1/2">
            <TextInput
              label={"Bank"}
              type="text"
              className="text-rp-grey-1100"
              value={values.bankName}
              onChange={(e) =>
                setValues((v) => ({ ...v, bankName: e.target.value }))
              }
            />
          </fieldset>
          <fieldset className="basis-1/2">
            <TextInput
              label={"Tax Payers ID"}
              type="text"
              className="mb-2 text-rp-grey-1100"
              value={values.tin}
              onChange={(e) =>
                setValues((v) => ({ ...v, tin: e.target.value }))
              }
            />
            <p className="text-sm">
              Rollpay will file 5% with holding taxes on your behalf when you
              receive payments
            </p>
          </fieldset>
          <Button
            variant="primary"
            className="mt-4 w-full"
            onClick={handleUpateAccountDetails}
            disabled={loading}
          >
            {loading ? "Loading..." : "Update Details"}
          </Button>
        </div>
      </form>
    </main>
  )
}
