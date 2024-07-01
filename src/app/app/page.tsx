"use client"

import Icon from "@/components/Icons/Icon"
import Button from "@/components/general/Button"
import CreateInvoiceOptionsModal from "./createInvoiceOptionsModal"
import { useContext, useMemo, useState } from "react"
import {
  CreateExternalInvoice,
  CreateInternalInvoice,
} from "./CreateInvoiceModals"

import { ProfileLetter } from "@/components/layouts/Projects"
import RequestPaymentModal from "./payments/RequestPaymentModal"
import { AuthContext } from "@/lib/context/AuthContext"
import Avatar from "@/components/general/Avatar"
import { ProjectContext } from "@/lib/context/ProjectContext"
import { PaymentRequestContext } from "@/lib/context/PaymentRequestsContext"
import formatDateString from "@/lib/utils/formatDateString"
import Link from "next/link"
import { UserDetailsContext } from "@/lib/context/UserDetailsContext"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import NairaSymbol from "@/components/general/NairaSymbol"

type InvoiceType = { external: boolean } | { internal: boolean }

export default function HomePage() {
  const { userDetails } = useContext(AuthContext)
  const { userAccount } = useContext(UserDetailsContext)
  const router = useRouter()

  const [showCreateInvoiceOptionsModal, setShowCreateInvoiceOptionsModal] =
    useState(false)
  const showCreateInvoiceOptions = () => {
    const hasInvoiceMeta = !!userDetails?.invoiceMeta

    if (hasInvoiceMeta) setShowCreateInvoiceOptionsModal(true)
    else {
      toast.error(
        "You need to fill your invoice meta details before creating an invoice."
      )
      router.push("/app/settings/invoice-meta")
    }
  }
  const [selectedInvoiceType, setSelectedInvoiceType] = useState({
    external: false,
    internal: false,
  })

  const [showRequestPaymentModal, setShowRequestPaymentModal] = useState(false)

  const selectInvoiceType = (invoiceType: InvoiceType) =>
    setSelectedInvoiceType((s) => ({ ...s, ...invoiceType }))

  const { selectedProject } = useContext(ProjectContext)

  const { paymentRequests } = useContext(PaymentRequestContext)

  const successfullPayments = useMemo(() => {
    return paymentRequests.filter((p) => p.status.toLowerCase() === "approved")
  }, [paymentRequests])

  const pendingPayments = useMemo(() => {
    return paymentRequests.filter((p) => p.status.toLowerCase() === "pending")
  }, [paymentRequests])

  const upcomingPaymentRequests = useMemo(() => {
    return pendingPayments
      .sort((a, b) => (new Date(a.dueDate) < new Date(b.dueDate) ? 1 : -1))
      .slice(0, 3)
  }, [pendingPayments])

  const projectEarnings = useMemo(
    () => successfullPayments.reduce((acc, curr) => acc + +curr.amount, 0),
    [successfullPayments]
  )

  return (
    <main className="px-4 py-4 pb-28 lg:px-0 lg:py-6 lg:pb-8">
      <header className="mb-6 flex items-center justify-between bg-white px-4 pb-3 pt-6 lg:mb-6 lg:bg-inherit lg:px-0 lg:pb-0 lg:pt-0">
        <div className="flex lg:hidden">
          <div
            className="flex cursor-pointer items-center gap-2"
            // onClick={() => setShowProjectOptions(true)}
          >
            {selectedProject && (
              <ProfileLetter
                name={selectedProject.name}
                className="rounded-lg"
              />
            )}
            <div className="flex items-center">
              <p className="text-xl font-bold text-rp-grey-1100">
                {selectedProject ? selectedProject.name : "No projects yet"}
              </p>
              <Icon name="caret_down" />
            </div>
          </div>
        </div>

        <h1 className="hidden font-space_grotesk text-[30px] font-bold capitalize text-rp-grey-200 lg:block">
          Hi, {userDetails?.firstName} {userDetails?.lastName}
        </h1>
        <div className="flex items-center gap-10">
          {/* <Icon name="bell" /> */}
          {userDetails && (
            <Link href="/app/settings/profile">
              <Avatar
                avatar={userDetails.avatar}
                firstName={userDetails.firstName}
              />
            </Link>
          )}
        </div>
      </header>

      <div className="relative mb-4 flex flex-col gap-2 rounded-2xl bg-rp-primary px-4 py-6 text-rp-grey-1200 md:gap-16 md:px-6 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xs md:text-base">Project Earnings</h1>
          <div className="relative z-10">
            <Icon name="info" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-rp-grey-600 md:text-2xl lg:text-3xl">
          <NairaSymbol /> {projectEarnings.toLocaleString()}
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
            <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full border border-rp-green-100">
              <Icon name="create_invoice_icon" />
            </div>
            <span className="font-semibold text-rp-grey-1100">
              Create Invoice
            </span>
          </div>
          <Icon name="caret_right" />
        </button>
        <button
          className="flex w-full items-center justify-between rounded-2xl bg-white p-4 md:basis-1/2"
          onClick={() => setShowRequestPaymentModal(true)}
        >
          <div className="flex items-center gap-3">
            <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full border border-rp-green-100">
              <Icon name="request_payment_icon" />
            </div>
            <span className="font-semibold text-rp-grey-1100">
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
          {upcomingPaymentRequests.length > 0 ? (
            upcomingPaymentRequests.map((payment, index) => (
              <div
                className="border-b-[.5px] border-rp-grey-500 py-2 last-of-type:border-none md:py-4"
                key={index}
              >
                <h1 className="mb-1 font-semibold text-rp-grey-1100">
                  <NairaSymbol /> {Number(payment.amount).toLocaleString()}
                </h1>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs capitalize">
                    Due {formatDateString(new Date(payment.dueDate))}
                  </h3>
                  <Button variant="neutral" className="decoration-rp-green-100">
                    <span className="text-xs font-semibold text-rp-green-100">
                      View
                    </span>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-[300px] w-full flex-col items-center justify-center bg-white py-10">
              <img
                src="/images/no_data.png"
                alt="no data found"
                className="h-auto w-[90%] max-w-[172px]"
              />
              <h1 className="mb-1 text-center font-space_grotesk text-xl font-bold text-rp-grey-200">
                No Payments Found
              </h1>
            </div>
          )}
        </div>
      </div>
      {(!userAccount?.taxId || successfullPayments.length > 0) && (
        <div>
          <h1 className="mb-2 font-space_grotesk text-lg font-bold">
            Notifications
          </h1>
          <div className="rounded-2xl bg-white px-4 py-4 md:px-6">
            {!userAccount?.taxId && (
              <div className="py-2">
                <h1 className="mb-3 text-xs font-medium">02/03/24</h1>
                <p className="mb-3 text-sm">
                  Kindly provide your Taxpayer ID. This helps us ensure
                  compliance and provide you with the best possible support.
                </p>
                <Link href="/app/settings/payment">
                  <Button
                    variant="neutral"
                    className="animate-pulse text-xs font-semibold text-rp-green-100 decoration-rp-green-100"
                  >
                    Fill Tax Payer ID and other Payment Details!
                  </Button>
                </Link>
              </div>
            )}
            {successfullPayments.length > 0 ? (
              <div className="border-t-[.5px] border-rp-grey-500 py-2 ">
                <h1 className="mb-3 text-xs font-medium">
                  {new Date().toLocaleDateString()}
                </h1>
                <p className="mb-3 text-sm">
                  Your payment request ‘{successfullPayments[0].subject}’ has
                  been approved
                </p>
                <h3 className="text-xs font-semibold text-rp-grey-200">
                  Due{" "}
                  {formatDateString(new Date(successfullPayments[0].dueDate))}
                </h3>
              </div>
            ) : null}
          </div>
        </div>
      )}
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
      <RequestPaymentModal
        show={showRequestPaymentModal}
        closeModal={() => setShowRequestPaymentModal(false)}
      />
    </main>
  )
}
