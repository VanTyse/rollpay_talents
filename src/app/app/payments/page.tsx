"use client"

import PaymentsTable from "./PaymentsTable"
import Pagination from "@/components/general/Pagination"
import RequestPaymentModal from "./RequestPaymentModal"
import { useContext, useMemo, useState } from "react"
import Button from "@/components/general/Button"
import Icon from "@/components/Icons/Icon"
import { PaymentRequestContext } from "@/lib/context/PaymentRequestsContext"
import usePagination from "@/lib/hooks/usePagination"
import { useViewPort } from "@/lib/hooks/useViewport"
import { ProjectContext } from "@/lib/context/ProjectContext"

export default function Payments() {
  const { paymentRequests } = useContext(PaymentRequestContext)
  const [showRequestPaymentModal, setShowRequestPaymentModal] = useState(false)
  const { width } = useViewPort()
  const { paginatedItems, currentPage, setPage, lastPage } = usePagination({
    items: paymentRequests,
    enabled: width > 768,
  })
  const { selectedProject } = useContext(ProjectContext)
  const isButtonDisabled = useMemo(() => !!!selectedProject, [])

  return (
    <main className="relative px-4 py-4 pb-32 md:pb-0 lg:px-0 lg:py-6">
      <header className="mb-4 flex items-start justify-between pt-6 md:mb-4 md:pb-3 lg:bg-inherit lg:px-4">
        <div>
          <h1 className="mb-1 font-space_grotesk text-xl font-bold text-rp-grey-200 md:text-[30px]">
            Payments
          </h1>
          <h3>Track all the payments you receive on this project here</h3>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <button
            className="flex items-center gap-2 rounded-lg bg-rp-blue-dark px-4 py-2.5 text-sm font-medium text-white shadow-input
             disabled:opacity-30 disabled:hover:cursor-not-allowed"
            onClick={() => setShowRequestPaymentModal(true)}
            disabled={isButtonDisabled}
          >
            Request Payment
          </button>
        </div>
      </header>

      <Button
        variant="primary"
        className="fixed bottom-[120px] left-1/2 flex w-max -translate-x-1/2 items-center gap-1 rounded-full text-sm lg:hidden"
        onClick={() => setShowRequestPaymentModal(true)}
        disabled={isButtonDisabled}
      >
        <Icon name="plus" color={isButtonDisabled ? "#6B7280" : "white"} />
        <span>Request Payment</span>
      </Button>

      <div className="flex flex-col gap-10">
        <PaymentsTable payments={paginatedItems} />
        <div className="hidden lg:block">
          <Pagination
            currentPage={currentPage}
            setPage={setPage}
            lastPage={lastPage}
          />
        </div>
      </div>
      <RequestPaymentModal
        show={showRequestPaymentModal}
        closeModal={() => setShowRequestPaymentModal(false)}
      />
    </main>
  )
}
