"use client"

import PaymentsTable from "./PaymentsTable"
import Pagination from "@/components/general/Pagination"
import RequestPaymentModal from "./RequestPaymentModal"
import { useContext, useState } from "react"
import Button from "@/components/general/Button"
import Icon from "@/components/Icons/Icon"
import { PaymentRequestContext } from "@/lib/context/PaymentRequestsContext"

export default function Payments() {
  const { paymentRequests } = useContext(PaymentRequestContext)
  const [showRequestPaymentModal, setShowRequestPaymentModal] = useState(false)
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
            className="flex items-center gap-2 rounded-lg bg-rp-blue-dark px-4 py-2.5 text-sm font-medium text-white shadow-input"
            onClick={() => setShowRequestPaymentModal(true)}
          >
            Request Payment
          </button>
        </div>
      </header>

      <Button
        variant="primary"
        className="fixed bottom-[120px] left-1/2 flex w-max -translate-x-1/2 items-center gap-1 rounded-full text-sm lg:hidden"
      >
        <Icon name="plus" />
        <span>Request Payment</span>
      </Button>

      <div className="flex flex-col gap-10">
        <PaymentsTable payments={paymentRequests} />
        <div className="hidden lg:block">
          {/* <Pagination currentPage={7} setPage={() => null} lastPage={10} /> */}
        </div>
      </div>
      <RequestPaymentModal
        show={showRequestPaymentModal}
        closeModal={() => setShowRequestPaymentModal(false)}
      />
    </main>
  )
}
