import { TextareaProps } from "@/lib/types"
import { twMerge } from "tailwind-merge"

export default function TextArea({
  label,
  className,
  error,
  ...props
}: TextareaProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={props?.id}
          className={`text-sm font-medium ${"text-rp-grey-300"}`}
        >
          {label}
          {props.required && "*"}
        </label>
      )}
      <textarea
        {...props}
        className={twMerge(
          `block w-full rounded-lg border-2 border-rp-grey-400 px-3.5 py-2.5 text-sm text-rp-grey-700
        shadow-input hover:border-rp-primary focus:border-rp-primary focus:outline-none disabled:placeholder:text-rp-grey-500 ${
          error?.message && "!border-rp-error-500"
        }focus:border-rp-primary bg-inherit outline-none`,
          className
        )}
        cols={props.cols ?? 50}
      ></textarea>
      {error?.message && (
        <div className="flex gap-2">
          {/* <Icon name="exclamatioInCircle" />
           */}
          <p className="text-rp-error-500">{error.message}</p>
        </div>
      )}
    </div>
  )
}
