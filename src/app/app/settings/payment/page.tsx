"use client"

import Icon from "@/components/Icons/Icon"
import Select from "@/components/forms/Select"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import { UserDetailsContext } from "@/lib/context/UserDetailsContext"
import { UtilsContext } from "@/lib/context/UtilsContext"
import useAxios from "@/lib/hooks/useAxios"
import Link from "next/link"
import { useContext, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false)
  const { userAccount, forceRefresh } = useContext(UserDetailsContext)
  const { banks } = useContext(UtilsContext)
  const [selectedBankCode, setSelectedBankCode] = useState<string | null>(null)
  const [values, setValues] = useState({
    accountNumber: userAccount?.accountNumber,
    accountName: userAccount?.accountName,
    bankName: userAccount?.bankName,
    taxId: userAccount?.taxId,
  })

  const bankOptions = useMemo(() => {
    return banks.map((bank) => ({
      value: bank.code,
      label: bank.name,
    }))
  }, [])

  // Filter `option.label` to match the user type `input`
  const filterOption = (input: string, option: any) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    if (userAccount)
      setValues({
        accountNumber: userAccount?.accountNumber,
        accountName: userAccount?.accountName,
        bankName: userAccount?.bankName,
        taxId: userAccount.taxId,
      })
  }, [userAccount])

  const axios = useAxios({})
  const handleUpateAccountDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.patch("/user/user-account", { ...values })
      toast.success("Account details updated successfully")
      setLoading(false)
      forceRefresh && forceRefresh()
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(
        "Something went wrong. Please try again if details have not been updated."
      )
    }
  }

  const resolveAcctName = async () => {
    try {
      const { data } = await axios.get(
        `/utilities/resolve-account-number?accountNumber=${values.accountNumber}&bankCode=${selectedBankCode}`
      )
      const accountName = data.data.accountName as string
      console.log(accountName)
      setValues((v) => ({ ...v, accountName }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (
      !selectedBankCode ||
      !values.accountNumber ||
      values.accountNumber.length !== 10
    ) {
      setValues((v) => ({ ...v, accountName: "" }))
      return
    } else {
      resolveAcctName()
    }
  }, [values.accountNumber, selectedBankCode])

  console.log(values)

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
            <Select
              showSearch
              label={"Bank"}
              className="font-semibold text-rp-grey-1100"
              options={bankOptions}
              filterOption={filterOption}
              defaultValue={values.bankName}
              value={values.bankName}
              onSelect={(value, option) => {
                setSelectedBankCode(value)
                setValues((v) => ({
                  ...v,
                  bankName: (option.label as string) ?? "",
                }))
              }}
            />
          </fieldset>
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
              // onChange={(e) =>
              //   setValues((v) => ({ ...v, accountName: e.target.value }))
              // }
              disabled
            />
          </fieldset>

          <fieldset className="basis-1/2">
            <TextInput
              label={"Tax Payers ID"}
              type="text"
              className="mb-2 text-rp-grey-1100"
              value={values.taxId}
              onChange={(e) =>
                setValues((v) => ({ ...v, taxId: e.target.value }))
              }
            />
            <p className="text-sm">
              Rollpay will file 5% withholding taxes on your behalf when you
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
