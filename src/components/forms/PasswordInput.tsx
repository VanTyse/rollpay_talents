import { InputProps } from "@/lib/types"
import Icon from "../Icons/Icon"
import { twMerge } from "tailwind-merge"
import { useMemo, useState } from "react"

const PasswordInput = ({
  className,
  label,
  error,
  containerClassName,
  type = "password",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = useMemo(
    () => (showPassword ? "text" : "password"),
    [showPassword]
  )
  return (
    <div className={twMerge("flex w-full flex-col gap-2", containerClassName)}>
      {label && (
        <label
          htmlFor={props?.id}
          className={`text-sm font-medium ${"text-rp-grey-300"}`}
        >
          {label}
          {props.required && "*"}
        </label>
      )}
      <div
        className={twMerge(
          `flex w-full items-center rounded-lg border-2 border-rp-grey-400 px-3.5 py-2.5 text-sm font-medium text-rp-grey-100
        shadow-input focus-within:border-rp-primary focus-within:outline-none hover:border-rp-primary disabled:placeholder:text-rp-grey-500 ${
          error?.message && "!border-rp-error-500"
        }focus-within:border-rp-primary bg-inherit outline-none`,
          className
        )}
      >
        <input
          {...props}
          className="flex flex-1 focus:outline-none"
          type={inputType || "text"}
        />
        <div
          onClick={() => setShowPassword((x) => !x)}
          className="hover:cursor-pointer"
        >
          {!showPassword ? <Icon name="eye" /> : <Icon name="eye_slashed" />}
        </div>
      </div>
      {error?.message && (
        <div className="flex gap-2">
          <p className="font-space_grotesk text-sm text-red-500">
            {error.message}
          </p>
        </div>
      )}
    </div>
  )
}

export default PasswordInput
