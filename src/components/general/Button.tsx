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
    disabled:hover:cursor-not-allowed disabled:bg-rp-grey-border disabled:border-rp-grey-border disabled:text-rp-grey-900 transition-all duration-50`,

  secondary: `border border-rp-grey-400 font-semibold text-rp-blue-500 rounded-xl py-2.5 px-[18px] flex justify-center items-center active:scale-95 transition-transform duration-50 hover:bg-rp-blue-50 shadow-input 
    disabled:hover:cursor-not-allowed disabled:bg-rp-grey-border disabled:border-rp-grey-border disabled:text-rp-grey-900`,
  neutral: `text-base font-medium text-rp-blue-dark hover:underline 
    disabled:hover:cursor-not-allowed disabled:bg-rp-grey-border disabled:border-rp-grey-border disabled:text-rp-grey-900`,
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
