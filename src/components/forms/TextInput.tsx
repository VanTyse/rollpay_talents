import { InputProps } from "@/lib/types"
import Icon from "../Icons/Icon"
import { twMerge } from "tailwind-merge"

const TextInput = ({
  className,
  label,
  error,
  containerClassName,
  ...props
}: InputProps) => {
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
      <input
        {...props}
        type={props.type || "text"}
        className={twMerge(
          `block w-full rounded-lg border-2 border-rp-grey-400 px-3.5 py-2.5 text-sm font-medium text-rp-grey-100
        shadow-input hover:border-rp-primary focus:border-rp-primary focus:outline-none disabled:placeholder:text-rp-grey-500 ${
          error?.message && "!border-rp-error-500"
        }focus:border-rp-primary bg-inherit outline-none`,
          className
        )}
      />
      {error?.message && (
        <div className="flex gap-2">
          {/* <Icon name="exclamatioInCircle" />
           */}
          <p className="font-space_grotesk text-sm text-red-500">
            {error.message}
          </p>
        </div>
      )}
    </div>
  )
}

export default TextInput
