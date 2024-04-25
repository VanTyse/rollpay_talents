"use client"

import Icon from "@/components/Icons/Icon"
import Button from "@/components/general/Button"
import CreateInvoiceOptionsModal from "./createInvoiceOptionsModal"
import { useState } from "react"
import {
  CreateExternalInvoice,
  CreateInternalInvoice,
} from "./CreateInvoiceModals"
import Image from "next/image"
import { Project } from "@/lib/types"
import { projects } from "@/lib/mockData"
import { ProfileLetter } from "@/components/layouts/Projects"

type InvoiceType = { external: boolean } | { internal: boolean }

export default function HomePage() {
  const [showCreateInvoiceOptionsModal, setShowCreateInvoiceOptionsModal] =
    useState(false)
  const showCreateInvoiceOptions = () => setShowCreateInvoiceOptionsModal(true)
  const [selectedInvoiceType, setSelectedInvoiceType] = useState({
    external: false,
    internal: false,
  })

  const selectInvoiceType = (invoiceType: InvoiceType) =>
    setSelectedInvoiceType((s) => ({ ...s, ...invoiceType }))

  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects[0]
  )
  const [showProjectOptions, setShowProjectOptions] = useState(false)
  const selectProject = (project: Project) => {
    setSelectedProject(project)
    setShowProjectOptions(false)
  }
  return (
    <main className="">
      <header className="flex items-center justify-between bg-white px-4 pb-3 pt-6 lg:mb-6 lg:bg-inherit lg:px-0 lg:pb-0 lg:pt-0">
        <div className="flex lg:hidden">
          <div
            className="flex cursor-pointer items-center gap-2"
            // onClick={() => setShowProjectOptions(true)}
          >
            {selectedProject && (
              <ProfileLetter
                name={selectedProject.project_name}
                className="rounded-lg"
              />
            )}
            <div className="flex items-center">
              <p className="text-rp-grey-1100 text-xl font-bold">
                {selectedProject
                  ? selectedProject.project_name
                  : "No projects yet"}
              </p>
              <Icon name="caret_down" />
            </div>
          </div>
        </div>

        <h1 className="hidden font-space_grotesk text-[30px] font-bold text-rp-grey-200 lg:block">
          Hi, Ayomide
        </h1>
        <div className="flex items-center gap-10">
          <Icon name="bell" />
          <Image
            width={40}
            height={40}
            src={"/images/avatar.png"}
            alt="avatar"
          />
        </div>
      </header>

      <div className="text-rp-grey-1200 relative mb-4 flex flex-col gap-2 rounded-2xl bg-rp-primary px-4 py-6 md:gap-16 md:px-6 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xs md:text-base">Project Earnings</h1>
          <div className="relative z-10">
            <Icon name="info" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-rp-grey-600 md:text-2xl lg:text-3xl">
          N30,000,000
        </h1>
        <img
          src="/images/logo_icon_blue.png"
          className="absolute right-5 top-1/2 h-auto max-w-[25%] -translate-y-1/2"
          alt=""
        />
      </div>
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-10">
        <button
          className="flex w-full items-center justify-between rounded-2xl bg-white p-4 md:basis-1/2"
          onClick={showCreateInvoiceOptions}
        >
          <div className="flex items-center gap-3">
            <div className="border-rp-green-100 flex aspect-square h-10 w-10 items-center justify-center rounded-full border">
              <Icon name="create_invoice_icon" />
            </div>
            <span className="text-rp-grey-1100 font-semibold">
              Create Invoice
            </span>
          </div>
          <Icon name="caret_right" />
        </button>
        <button className="flex w-full items-center justify-between rounded-2xl bg-white p-4 md:basis-1/2">
          <div className="flex items-center gap-3">
            <div className="border-rp-green-100 flex aspect-square h-10 w-10 items-center justify-center rounded-full border">
              <Icon name="request_payment_icon" />
            </div>
            <span className="text-rp-grey-1100 font-semibold">
              Request Payment
            </span>
          </div>
          <Icon name="caret_right" />
        </button>
      </div>
      <div className="mb-4">
        <h1 className="mb-2 font-space_grotesk text-lg font-bold">
          Upcoming Payments
        </h1>
        <div className="rounded-2xl bg-white px-4 py-4 md:px-6">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                className="border-b-[.5px] border-rp-grey-500 py-2 last-of-type:border-none md:py-4"
                key={index}
              >
                <h1 className="text-rp-grey-1100 mb-1 font-semibold">
                  15,000,000.00
                </h1>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs ">Due 24th March, 2024</h3>
                  <Button variant="neutral" className="decoration-rp-green-100">
                    <span className="text-rp-green-100 text-xs font-semibold">
                      View
                    </span>
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h1 className="mb-2 font-space_grotesk text-lg font-bold">
          Payment Requests
        </h1>
        <div className="rounded-2xl bg-white px-4 py-4 md:px-6">
          <div className="border-b-[.5px] border-rp-grey-500 py-2">
            <h1 className="mb-3 text-xs font-medium">02/03/24</h1>
            <p className="mb-3 text-sm">
              Kindly provide your Taxpayer ID. This helps us ensure compliance
              and provide you with the best possible support.
            </p>
            <Button
              variant="neutral"
              className="decoration-rp-green-100 text-rp-green-100 text-xs font-semibold"
            >
              Fill Tax Payer ID
            </Button>
          </div>
          <div className="py-2">
            <h1 className="mb-3 text-xs font-medium">02/03/24</h1>
            <p className="mb-3 text-sm">
              Your payment request ‘Hotel Booking’ has been approved
            </p>
            <h3 className="text-xs font-semibold text-rp-grey-200">
              Due 24th March, 2024
            </h3>
          </div>
        </div>
      </div>
      <CreateInvoiceOptionsModal
        selectType={selectInvoiceType}
        selectedInvoice={selectedInvoiceType}
        show={showCreateInvoiceOptionsModal}
        closeModal={() => setShowCreateInvoiceOptionsModal(false)}
      />
      <CreateExternalInvoice
        show={selectedInvoiceType.external}
        closeModal={() => selectInvoiceType({ external: false })}
      />
      <CreateInternalInvoice
        show={selectedInvoiceType.internal}
        closeModal={() => selectInvoiceType({ internal: false })}
      />
    </main>
  )
}
