import Icon from "@/components/Icons/Icon"
import Button from "@/components/general/Button"
import Modal from "@/components/general/Modal"
import SendEmail from "@/components/general/SendEmail"
import { useState } from "react"

interface ModalProps {
  show: boolean
  closeModal: () => void
}

const InvoiceModal = ({ show, closeModal }: ModalProps) => {
  const [showSendEmail, setShowSendEmail] = useState(true)
  return (
    <Modal show={show} closeModal={closeModal}>
      <div
        className={`bg-rp-grey-1400 fixed left-1/2 h-lvh w-dvw max-w-[520px] -translate-x-1/2 rounded-none  p-4 py-8 md:top-1/2  md:max-h-[90vh] md:w-[90%] md:-translate-y-1/2 md:rounded-2xl md:py-6 ${showSendEmail && "md:hidden"}`}
      >
        <div className="mb-8 flex w-full items-center justify-between">
          <button onClick={closeModal}>
            <Icon name="left_arrow" />
          </button>
          <div className="flex items-center justify-between gap-4">
            <button className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-white">
              <Icon name="edit" />
            </button>
            <button className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-white">
              <Icon name="download" />
            </button>
          </div>
        </div>
        <div className="mb-8 overflow-y-auto rounded-2xl bg-white p-4 py-6 md:max-h-[calc(90dvh-200px)]">
          <div className="mb-8">
            <Icon name="directory" />
            <h1 className="text-rp-grey-1100 mb-2 mt-4 text-xl font-semibold">
              Ayomide Dahunsi
            </h1>
            <h3 className="text-sm">ayomidedahunsi2@gmail.com</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <h5>Invoice No</h5>
              <h4 className="text-rp-grey-1500 font-semibold">20</h4>
            </div>
            <div className="flex items-center justify-between text-sm">
              <h5>Invoice for</h5>
              <h4 className="text-rp-grey-1500 font-semibold">
                Acting Service
              </h4>
            </div>
            <div className="flex items-center justify-between text-sm">
              <h5>Client</h5>
              <h4 className="text-rp-grey-1500 font-semibold">Tinsel Plc</h4>
            </div>
            <div className="flex items-center justify-between text-sm">
              <h5>Email</h5>
              <h4 className="text-rp-grey-1500 font-semibold">
                TinselHq@gmail.com
              </h4>
            </div>
            <div className="flex items-center justify-between text-sm">
              <h5>Amount</h5>
              <h4 className="text-rp-grey-1500 font-semibold">N500,000</h4>
            </div>
            <div className="flex items-center justify-between text-sm">
              <h5>Due Date</h5>
              <h4 className="text-rp-grey-1500 font-semibold">
                15th March 2024
              </h4>
            </div>{" "}
            <div className="flex items-center justify-between text-sm">
              <h5>Account Name</h5>
              <h4 className="text-rp-grey-1500 font-semibold">
                Ayomide Dahunsi
              </h4>
            </div>
            <div className="flex items-center justify-between text-sm">
              <h5>Bank</h5>
              <h4 className="text-rp-grey-1500 font-semibold">
                Guaranty Trust Bank
              </h4>
            </div>
            <div className="flex items-center justify-between text-sm">
              <h5>Account Number</h5>
              <h4 className="text-rp-grey-1500 font-semibold">0237154436</h4>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <h5>Description</h5>
              <h4 className="text-rp-grey-1500 font-semibold">
                First installment payment for the the Tinsel project
              </h4>
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => setShowSendEmail(true)}
        >
          Send To
        </Button>
      </div>
      <SendEmail
        show={showSendEmail}
        closeModal={() => setShowSendEmail(false)}
        modalClassName="md:bg-inherit"
        title="Send Invoice"
      />
    </Modal>
  )
}

export default InvoiceModal
