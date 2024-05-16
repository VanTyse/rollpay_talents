import {
  DatePicker as AntDDatePicker,
  DatePickerProps as AntdDatePickerProps,
} from "antd"
import {} from "antd"

interface DatePickerProps extends AntdDatePickerProps {
  label?: string | React.ReactNode
}

export default function DatePicker({ label, ...props }: DatePickerProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={props?.id}
          className="text-sm font-medium text-rp-grey-300"
        >
          {label}
        </label>
      )}
      <AntDDatePicker
        className="block w-full border-rp-grey-400 font-sans text-rp-grey-100 shadow-input focus:border-rp-primary "
        placeholder={props.placeholder ?? ""}
        {...props}
      />
    </div>
  )
}
