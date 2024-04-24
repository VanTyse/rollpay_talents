import { type ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type ModalPropsType = {
  children: ReactNode
  show: boolean
  closeModal: () => void
  className?: string
}

export default function Modal({
  children,
  show,
  closeModal,
  className,
}: ModalPropsType) {
  if (!show) return
  return (
    <div
      className={twMerge(
        "fixed left-0 top-0 z-50 h-dvh w-dvw cursor-pointer bg-black/70",
        className
      )}
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()} className="cursor-default">
        {children}
      </div>
    </div>
  )
}
