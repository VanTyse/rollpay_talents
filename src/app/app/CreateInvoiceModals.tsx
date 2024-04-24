"use client"

import Icon from "@/components/Icons/Icon"
import DatePicker from "@/components/forms/DatePicker"
import Select from "@/components/forms/Select"
import TextArea from "@/components/forms/TextArea"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Modal from "@/components/general/Modal"
import { Space_Grotesk } from "next/font/google"
import { useEffect, useState } from "react"
import InvoiceModal from "./InvoiceModal"

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

  useEffect(() => {
    if (creating === "pending") setTimeout(() => setCreating("success"), 2000)
  }, [creating])
  const create = () => {
    setCreating("pending")
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
  if (creating === "success")
    return (
      <InvoiceModal
        show={creating === "success"}
        closeModal={() => setCreating("default")}
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
            <TextInput id="internal_invoice_amount" label="Amount" />
          </fieldset>

          <fieldset className="mb-10">
            <DatePicker label={"Due Date"} />
          </fieldset>

          <fieldset>
            <TextInput id="internal_service" label="Service" />
          </fieldset>

          <fieldset className="mb-2">
            <TextArea
              id="internal_service_description"
              label="Description"
              className="h-32"
            />
          </fieldset>
          <Button onClick={create} variant="primary" className="w-full">
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

  useEffect(() => {
    if (creating === "pending") setTimeout(() => setCreating("success"), 2000)
  }, [creating])
  const create = () => {
    setCreating("pending")
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
  if (creating === "success")
    return (
      <InvoiceModal
        show={creating === "success"}
        closeModal={() => setCreating("default")}
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
            <TextInput id="external_invoice_amount" label="Amount" />
          </fieldset>
          <fieldset>
            <Select label="Project" />
          </fieldset>
          <fieldset>
            <DatePicker label={"Due Date"} />
          </fieldset>
          <fieldset>
            <TextInput id="external_client_name" label="Client Name" />
          </fieldset>
          <fieldset>
            <TextInput id="external_client_email" label="Client Email" />
          </fieldset>
          <fieldset>
            <TextInput id="external_service" label="Service" />
          </fieldset>

          <fieldset className="mb-2">
            <TextArea
              id="external_service_description"
              label="Description"
              className="h-32"
            />
          </fieldset>
          <Button variant="primary" className="w-full" onClick={create}>
            Create Invoice
          </Button>
        </form>
      </div>
    </Modal>
  )
}
