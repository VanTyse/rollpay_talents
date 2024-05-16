import Icon from "@/components/Icons/Icon"
import Modal from "@/components/general/Modal"
import { Payment } from "@/lib/types"
import { useEffect, useState } from "react"

interface ModalProps {
  show: boolean
  closeModal: () => void
  payment: Payment
}

export default function PaymentDetailsModal({
  show,
  closeModal,
  payment,
}: ModalProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (!show) return setAnimate(false)
    let timeout: ReturnType<typeof setTimeout>

    timeout = setTimeout(() => {
      setAnimate(true)
    }, 0)

    return () => clearTimeout(timeout)
  }, [show])

  return (
    <Modal show={show} closeModal={closeModal}>
      <div
        className={`fixed right-0 h-dvh w-4/5 max-w-[536px] translate-x-full bg-white px-[18px] py-12 transition-all ${animate && "right-0 !translate-x-0 delay-1000"}`}
      >
        <div className="mb-[52px] flex items-center justify-between ">
          <h1 className="font-space_grotesk text-2xl font-bold text-rp-grey-200">
            Payment Details
          </h1>
          <button onClick={closeModal}>
            <Icon name="close" />
          </button>
        </div>
        <div className="mb-12 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-rp-grey-900">Total Amount</h1>
            <h3 className="text-sm font-semibold text-rp-grey-1100">
              {payment.amount}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-rp-grey-900">Category</h1>
            <h3 className="text-sm font-semibold capitalize text-rp-grey-1100">
              {payment.category.name}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-rp-grey-900">Amount</h1>
            <h3 className="text-sm font-semibold text-rp-grey-1100">
              {payment.amount}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-rp-grey-900">PAYE Rate</h1>
            <h3 className="text-sm font-semibold text-rp-grey-1100">2%</h3>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-rp-grey-900">Amount Due</h1>
            <h3 className="text-sm font-semibold text-rp-grey-1100">
              N148,000
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-rp-grey-900">
              Optional description about the payment
            </h1>
          </div>
        </div>
        <button className="flex h-12 w-full items-center justify-center rounded-lg border border-rp-green-mint text-sm font-medium text-rp-blue-dark shadow-input">
          Edit Request
        </button>
      </div>
    </Modal>
  )
}
