import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: keyof typeof VARIANT
}

const VARIANT = {
  primary: `bg-rp-blue-dark rounded-lg py-2.5 px-[18px] text-white flex justify-center items-center font-semibold active:scale-95 
    transition-all duration-50 border border-rp-blue-dark
    disabled:hover:cursor-not-allowed disabled:bg-rp-neutral-100 disabled:text-rp-neutral-300 disabled:border-rp-neutral-100 transition-all duration-50`,

  secondary:
    "border border-rp-grey-400 font-semibold text-rp-blue-500 rounded-xl py-2.5 px-4.5 flex justify-center items-center active:scale-95 transition-transform duration-50 hover:bg-rp-blue-50 shadow-input",
  neutral: "text-base font-medium text-rp-blue-dark hover:underline",
}

export default function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={twMerge(VARIANT[variant], className)} {...props}>
      {children}
    </button>
  )
}
