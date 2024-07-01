"use client"

import Icon from "@/components/Icons/Icon"
import DragandDrop from "@/components/forms/DragandDrop"
import Select from "@/components/forms/Select"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Avatar from "@/components/general/Avatar"
import { AuthContext, User } from "@/lib/context/AuthContext"
import { UtilsContext } from "@/lib/context/UtilsContext"
import validateObject from "@/lib/utils/validateObject"
import useAxios from "@/lib/hooks/useAxios"
import newAxios from "axios"
import { toast } from "sonner"
import { useSession } from "@/app/auth/useSession"

interface FormType {
  invoiceMeta: {
    companyName: string
    companyAddress: string
    companyCity: string
    companyState: string
    companyZip: string
    companyCountry: string
    companyEmail: string
    companyPhone: string
    slogan: string
  }
}

export default function InvoiceMetaPage() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const navigate = (href: string) => router.push(href)
  const axios = useAxios({})
  const { userDetails } = useContext(AuthContext)
  const { countries } = useContext(UtilsContext)
  const { session, updateSession } = useSession()

  const countriesOptions = useMemo(
    () =>
      countries.map((country) => ({
        value: country.name,
        label: country.name,
      })),
    [countries]
  )

  // Filter `option.label` to match the user type `input`
  const filterOption = (input: string, option: any) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState<FormType>({
    invoiceMeta: {
      companyName: "",
      companyAddress: "",
      companyCity: "",
      companyState: "",
      companyZip: "",
      companyCountry: "",
      companyEmail: "",
      companyPhone: "",
      slogan: "",
    },
  })

  useEffect(() => {
    if (!userDetails) return
    setFormValues({
      invoiceMeta: {
        companyName: userDetails.invoiceMeta?.companyName ?? "",
        companyAddress: userDetails.invoiceMeta?.companyAddress ?? "",
        companyCity: userDetails.invoiceMeta?.companyCity ?? "",
        companyState: userDetails.invoiceMeta?.companyState ?? "",
        companyZip: userDetails.invoiceMeta?.companyZip ?? "",
        companyCountry: userDetails.invoiceMeta?.companyCountry ?? "",
        companyEmail: userDetails.invoiceMeta?.companyEmail ?? "",
        companyPhone: userDetails.invoiceMeta?.companyPhone ?? "",
        slogan: userDetails.invoiceMeta?.slogan ?? "",
      },
    })
  }, [userDetails])

  const handleUpdateUserDetails = async () => {
    axios
      .patch(`/user/profile`, {
        ...formValues,
      })
      .then((response) => {
        setLoading(false)

        toast.success("Invoice meta updated successfully")
        const newUserDetails = response.data.data as User
        if (session) {
          const newSession = {
            ...session,
            user: {
              ...session.user,
              ...newUserDetails,
            },
          }

          updateSession(newSession)
        }
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        toast.error("Something went wrong")
      })
  }

  return (
    <main
      className="bg-red fixed left-0 top-0 z-10 h-[calc(100lvh-105px)] w-dvw overflow-auto rounded-2xl bg-white px-4 py-6 md:static
        md:h-auto md:w-auto md:px-0"
    >
      <div className="mb-8 flex items-center md:hidden">
        <Link href="/app/settings" className="relative z-10">
          <Icon name="left_arrow" />
        </Link>
        <h1 className="relative -left-6 flex-1 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Invoice Meta
        </h1>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 border-b border-b-rp-grey-1600 pb-6 md:px-4">
          <div>
            <h3 className="mb-3 font-space_grotesk font-semibold">
              Please fill this in order to create invoices.
            </h3>
          </div>

          {/* Company Name and Country */}
          <div className="flex flex-col gap-6 md:flex-row">
            <fieldset className="basis-1/2">
              <TextInput
                label={"Company name"}
                value={formValues.invoiceMeta.companyName}
                onChange={(e) =>
                  setFormValues((v) => ({
                    ...v,
                    invoiceMeta: {
                      ...v.invoiceMeta,
                      companyName: e.target.value,
                    },
                  }))
                }
              />
            </fieldset>
            <fieldset className="basis-1/2">
              <Select
                showSearch
                label={"Company Country"}
                options={countriesOptions}
                filterOption={filterOption}
                defaultValue={formValues.invoiceMeta.companyCountry}
                value={formValues.invoiceMeta.companyCountry}
                onSelect={(value) =>
                  setFormValues((v) => ({
                    ...v,
                    invoiceMeta: {
                      ...v.invoiceMeta,
                      companyCountry: value,
                    },
                  }))
                }
              />
            </fieldset>
          </div>

          {/* Company Email and Phone */}

          <div className="flex flex-col gap-6 md:flex-row">
            <fieldset className="basis-1/2">
              <TextInput
                label={"Company Email"}
                value={formValues.invoiceMeta.companyEmail}
                onChange={(e) =>
                  setFormValues((v) => ({
                    ...v,
                    invoiceMeta: {
                      ...v.invoiceMeta,
                      companyEmail: e.target.value,
                    },
                  }))
                }
              />
            </fieldset>
            <fieldset className="basis-1/2">
              <TextInput
                label={"Company Phone"}
                value={formValues.invoiceMeta.companyPhone}
                onChange={(e) =>
                  setFormValues((v) => ({
                    ...v,
                    invoiceMeta: {
                      ...v.invoiceMeta,
                      companyPhone: e.target.value,
                    },
                  }))
                }
              />
            </fieldset>
          </div>
          {/* Company City and State */}

          <div className="flex flex-col gap-6 md:flex-row">
            <fieldset className="basis-1/2">
              <TextInput
                label={"Company city"}
                value={formValues.invoiceMeta.companyCity}
                onChange={(e) =>
                  setFormValues((v) => ({
                    ...v,
                    invoiceMeta: {
                      ...v.invoiceMeta,
                      companyCity: e.target.value,
                    },
                  }))
                }
              />
            </fieldset>
            <fieldset className="basis-1/2">
              <TextInput
                label={"Company state"}
                value={formValues.invoiceMeta.companyState}
                onChange={(e) =>
                  setFormValues((v) => ({
                    ...v,
                    invoiceMeta: {
                      ...v.invoiceMeta,
                      companyState: e.target.value,
                    },
                  }))
                }
              />
            </fieldset>
          </div>

          <fieldset className="basis-1/2">
            <TextInput
              label={"Company Address"}
              value={formValues.invoiceMeta.companyAddress}
              onChange={(e) =>
                setFormValues((v) => ({
                  ...v,
                  invoiceMeta: {
                    ...v.invoiceMeta,
                    companyAddress: e.target.value,
                  },
                }))
              }
            />
          </fieldset>

          {/* Company Zip and Slogan */}

          <div className="flex flex-col gap-6 md:flex-row">
            <fieldset className="basis-1/2">
              <TextInput
                label={"Company zip"}
                value={formValues.invoiceMeta.companyZip}
                onChange={(e) =>
                  setFormValues((v) => ({
                    ...v,
                    invoiceMeta: {
                      ...v.invoiceMeta,
                      companyZip: e.target.value,
                    },
                  }))
                }
              />
            </fieldset>
            <fieldset className="basis-1/2">
              <TextInput
                label={"Slogan"}
                value={formValues.invoiceMeta.slogan}
                onChange={(e) =>
                  setFormValues((v) => ({
                    ...v,
                    invoiceMeta: {
                      ...v.invoiceMeta,
                      slogan: e.target.value,
                    },
                  }))
                }
              />
            </fieldset>
          </div>

          {/* Company Address */}
        </div>
        <div className="flex justify-end">
          <div className="flex gap-6">
            <Button
              variant="secondary"
              onClick={() => navigate("/app/settings")}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={loading}
              onClick={handleUpdateUserDetails}
            >
              {loading ? "Loading..." : "Save changes"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}
