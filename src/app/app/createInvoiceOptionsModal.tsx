"use client"

import Icon from "@/components/Icons/Icon"
import Modal from "@/components/general/Modal"
import { ProjectContext } from "@/lib/context/ProjectContext"
import { Space_Grotesk } from "next/font/google"
import { useContext } from "react"

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

interface ModalProps {
  show: boolean
  closeModal: () => void
  selectedInvoice: { internal: boolean; external: boolean }
  selectType: (type: { internal: boolean } | { external: boolean }) => void
}

export default function CreateInvoiceOptionsModal({
  show,
  closeModal,
  selectType,
}: ModalProps) {
  const selectExternal = () => {
    selectType({ external: true })
    closeModal()
  }
  const selectInternal = () => {
    selectType({ internal: true })
    closeModal()
  }

  const { selectedProject } = useContext(ProjectContext)

  return (
    <Modal show={show} closeModal={closeModal}>
      <div className="fixed left-1/2 top-1/2 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-4 md:py-6">
        <h1
          className={`mb-4 text-xl font-bold text-rp-grey-200 md:mb-6 md:text-2xl ${space_grotesk.className}`}
        >
          Select Invoice Type
        </h1>
        <div className="flex flex-col gap-4 md:gap-6">
          {selectedProject && (
            <button
              className="flex items-center gap-2 rounded-2xl border border-rp-grey-border p-4 text-start md:pr-8"
              onClick={selectInternal}
            >
              <div className="flex-1">
                <h1 className="mb-1 text-sm font-semibold text-rp-grey-200 md:text-base">
                  For this project
                </h1>
                <h3 className="text-xs md:text-sm">
                  Create and send an invoice for services rendered on this
                  project
                </h3>
              </div>
              <Icon name="caret_right" />
            </button>
          )}
          <button
            className="flex items-center gap-2 rounded-2xl border border-rp-grey-border p-4 text-start md:pr-8"
            onClick={selectExternal}
          >
            <div className="flex-1">
              <h1 className="mb-1 text-sm font-semibold text-rp-grey-200 md:text-base">
                External Invoice
              </h1>
              <h3 className="text-xs md:text-sm">
                Create and download an invoice for services rendered on projects
                outside this account
              </h3>
            </div>
            <Icon name="caret_right" />
          </button>
        </div>
      </div>
    </Modal>
  )
}
