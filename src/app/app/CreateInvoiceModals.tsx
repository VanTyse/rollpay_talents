"use client"

import Icon from "@/components/Icons/Icon"
import DatePicker from "@/components/forms/DatePicker"
import Select from "@/components/forms/Select"
import TextArea from "@/components/forms/TextArea"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Modal from "@/components/general/Modal"
import { Space_Grotesk } from "next/font/google"
import { useContext, useEffect, useMemo, useState } from "react"
import InvoiceModal from "./InvoiceModal"
import { ProjectContext } from "@/lib/context/ProjectContext"
import useAxios from "@/lib/hooks/useAxios"
import { toast } from "sonner"
import { Invoice } from "@/lib/types"
import validateObject from "@/lib/utils/validateObject"
import { InvoiceContext } from "@/lib/context/InvoiceContext"

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

interface ModalProps {
  show: boolean
  closeModal: () => void
}

export function CreateInternalInvoice({ show, closeModal }: ModalProps) {
  const [creating, setCreating] = useState<
    "success" | "failed" | "pending" | "default"
  >("default")
  const { forceRefresh } = useContext(InvoiceContext)

  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const { company } = useContext(ProjectContext)

  const [values, setValues] = useState({
    service: "",
    clientEmail: company?.email,
    clientName: company?.name,
    clientPhone: company?.phone,
    description: "",
    amount: "",
    dueDate: "",
  })

  useEffect(() => {
    if (company)
      setValues((v) => ({
        ...v,
        clientEmail: company.email,
        clientName: company.name,
        clientPhone: company.phone,
      }))
  }, [company])

  const amountValue = useMemo(() => {
    return formatAmountString(values.amount)
  }, [values.amount])

  const axios = useAxios({})

  const handleCreateInvoice = async () => {
    const invalidatedKeys = validateObject(values, [
      "amount",
      "description",
      "dueDate",
      "service",
    ])

    if (invalidatedKeys.length > 0) {
      invalidatedKeys.map((key) => toast.warning(`Please provide ${key}`))
      return
    }
    try {
      setCreating("pending")
      const { data } = await axios.post("/invoices", {
        ...values,
        status: "pending",
        amount: +values.amount.replaceAll("N", "").replaceAll(",", ""),
      })
      const invoice = data.data as Invoice
      setInvoice(invoice)
      toast.success("Invoice created successfully")
      setCreating("success")
      setValues({
        service: "",
        clientEmail: company?.email,
        clientName: company?.name,
        clientPhone: company?.phone,
        description: "",
        amount: "",
        dueDate: "",
      })
      forceRefresh && forceRefresh()
    } catch (error) {
      console.log(error)
      setCreating("failed")
    }
  }

  if (creating === "pending")
    return (
      <Modal show={show} closeModal={closeModal}>
        <div className="fixed left-1/2 flex h-lvh w-dvw max-w-[520px] -translate-x-1/2 items-center justify-center overflow-y-auto rounded-none bg-white p-4 md:top-1/2 md:max-h-[50dvh] md:w-[90%] md:-translate-y-1/2 md:rounded-2xl md:py-6">
          <div className="flex flex-col items-center gap-4">
            <Icon name="directory" />
            <span className="font-space_grotesk text-xl font-bold text-rp-blue-dark">
              Creating Invoice...
            </span>
          </div>
        </div>
      </Modal>
    )
  if (creating === "success" && invoice)
    return (
      <InvoiceModal
        show={creating === "success"}
        closeModal={() => setCreating("default")}
        invoice={invoice}
        allowSendEmail
      />
    )
  return (
    <Modal show={show} closeModal={closeModal}>
      <div className="fixed left-1/2 h-lvh w-dvw max-w-[520px] -translate-x-1/2 overflow-y-auto rounded-none bg-white p-4 md:top-1/2 md:max-h-[90dvh] md:w-[90%] md:-translate-y-1/2 md:rounded-2xl md:py-8">
        <div className="mb-4 flex items-center">
          <button onClick={closeModal}>
            <Icon name="left_arrow" />
          </button>
          <h1
            className={`flex-1 text-center text-xl font-bold text-rp-grey-200 md:text-2xl ${space_grotesk.className}`}
          >
            Create Invoice
          </h1>
        </div>
        <h1 className="mb-4 text-center text-sm">
          Fill out the form below to request payment for your services or
          expenses. Ensure all info are accurate
        </h1>
        <form
          className="flex flex-col gap-2"
          onClick={(e) => e.preventDefault()}
        >
          <fieldset>
            <TextInput
              id="internal_invoice_amount"
              label="Amount"
              value={amountValue}
              onChange={(e) =>
                setValues((v) => ({ ...v, amount: e.target.value }))
              }
            />
          </fieldset>

          <fieldset className="mb-10">
            <DatePicker
              label={"Due Date"}
              onChange={(date) =>
                setValues((v) => ({ ...v, dueDate: date.format("YYYY-MM-DD") }))
              }
            />
          </fieldset>

          <fieldset>
            <TextInput
              id="internal_service"
              label="Service"
              value={values.service}
              onChange={(e) =>
                setValues((v) => ({ ...v, service: e.target.value }))
              }
            />
          </fieldset>

          <fieldset className="mb-2">
            <TextArea
              id="internal_service_description"
              label="Description"
              className="h-32"
              value={values.description}
              onChange={(e) =>
                setValues((v) => ({ ...v, description: e.target.value }))
              }
            />
          </fieldset>
          <Button
            onClick={handleCreateInvoice}
            variant="primary"
            className="w-full"
          >
            Create Invoice
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export function CreateExternalInvoice({ show, closeModal }: ModalProps) {
  const [creating, setCreating] = useState<
    "success" | "failed" | "pending" | "default"
  >("default")
  const { forceRefresh } = useContext(InvoiceContext)

  const [invoice, setInvoice] = useState<Invoice | null>(null)

  const [values, setValues] = useState({
    service: "",
    clientEmail: "",
    clientName: "",
    clientPhone: "",
    description: "",
    amount: "",
    dueDate: "",
  })

  const amountValue = useMemo(() => {
    return formatAmountString(values.amount)
  }, [values.amount])

  const axios = useAxios({})
  const handleCreateInvoice = async () => {
    const invalidatedKeys = validateObject(values, [
      "amount",
      "clientEmail",
      "clientPhone",
      "description",
      "dueDate",
      "service",
    ])

    if (invalidatedKeys.length > 0) {
      invalidatedKeys.map((key) => toast.warning(`Please provide ${key}`))
      return
    }
    try {
      setCreating("pending")
      const { data } = await axios.post("/invoices", {
        ...values,
        status: "pending",
        amount: +values.amount,
      })

      console.log(data)
      const invoice = data.data as Invoice
      setInvoice(invoice)
      toast.success("Invoice created successfully")
      setCreating("success")
      setValues({
        service: "",
        clientEmail: "",
        clientName: "",
        clientPhone: "",
        description: "",
        amount: "",
        dueDate: "",
      })
      forceRefresh && forceRefresh()
    } catch (error: any) {
      console.log(error)
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "something went wrong"
      )
      setCreating("failed")
    }
  }

  if (creating === "pending")
    return (
      <Modal show={show} closeModal={closeModal}>
        <div className="fixed left-1/2 flex h-lvh w-dvw max-w-[520px] -translate-x-1/2 items-center justify-center overflow-y-auto rounded-none bg-white p-4 md:top-1/2 md:max-h-[50dvh] md:w-[90%] md:-translate-y-1/2 md:rounded-2xl md:py-6">
          <div className="flex flex-col items-center gap-4">
            <Icon name="directory" />
            <span className="font-space_grotesk text-xl font-bold text-rp-blue-dark">
              Creating Invoice...
            </span>
          </div>
        </div>
      </Modal>
    )
  if (creating === "success" && invoice)
    return (
      <InvoiceModal
        show={creating === "success"}
        closeModal={() => setCreating("default")}
        invoice={invoice}
        allowSendEmail={false}
      />
    )

  return (
    <Modal show={show} closeModal={closeModal}>
      <div className="fixed left-1/2 h-[100vh] w-dvw max-w-[520px] -translate-x-1/2 overflow-y-auto rounded-none bg-white p-4 md:top-1/2 md:max-h-[90dvh] md:w-[90%] md:-translate-y-1/2 md:rounded-2xl md:py-8">
        <div className="mb-4 flex items-center">
          <button onClick={closeModal}>
            <Icon name="left_arrow" />
          </button>
          <h1
            className={`flex-1 text-center text-xl font-bold text-rp-grey-200 md:text-2xl ${space_grotesk.className}`}
          >
            Create Invoice
          </h1>
        </div>
        <h1 className="mb-4 text-center text-sm">
          Fill out the form below to request payment for your services or
          expenses. Ensure all info are accurate
        </h1>
        <form
          className="flex flex-col gap-2"
          onClick={(e) => e.preventDefault()}
        >
          <fieldset>
            <TextInput
              id="external_invoice_amount"
              label="Amount"
              value={amountValue}
              onChange={(e) =>
                setValues((v) => ({ ...v, amount: e.target.value }))
              }
            />
          </fieldset>
          {/* <fieldset>
            <Select label="Project" options={projectOptions} />
          </fieldset> */}
          <fieldset>
            <DatePicker
              label={"Due Date"}
              onChange={(date) =>
                setValues((v) => ({ ...v, dueDate: date.format("YYYY-MM-DD") }))
              }
            />
          </fieldset>
          <fieldset>
            <TextInput
              id="external_client_name"
              label="Client Name"
              value={values.clientName}
              onChange={(e) =>
                setValues((v) => ({ ...v, clientName: e.target.value }))
              }
            />
          </fieldset>
          <fieldset>
            <TextInput
              id="external_client_email"
              label="Client Email"
              value={values.clientEmail}
              onChange={(e) =>
                setValues((v) => ({ ...v, clientEmail: e.target.value }))
              }
            />
          </fieldset>
          <fieldset>
            <TextInput
              id="external_client_phone"
              label="Client Phone"
              value={values.clientPhone}
              onChange={(e) =>
                setValues((v) => ({ ...v, clientPhone: e.target.value }))
              }
            />
          </fieldset>
          <fieldset>
            <TextInput
              id="external_service"
              label="Service"
              value={values.service}
              onChange={(e) =>
                setValues((v) => ({ ...v, service: e.target.value }))
              }
            />
          </fieldset>

          <fieldset className="mb-2">
            <TextArea
              id="external_service_description"
              label="Description"
              className="h-32"
              value={values.description}
              onChange={(e) =>
                setValues((v) => ({ ...v, description: e.target.value }))
              }
            />
          </fieldset>

          <Button
            variant="primary"
            className="w-full"
            onClick={handleCreateInvoice}
          >
            Create Invoice
          </Button>
        </form>
      </div>
    </Modal>
  )
}

const formatAmountString = (text: string) => {
  const stringWithNoNumbers = text.replace(/[^0-9]/g, "")
  const value = stringWithNoNumbers
    ? Number(stringWithNoNumbers).toLocaleString()
    : stringWithNoNumbers

  return `${value}`
}
