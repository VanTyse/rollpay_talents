import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd"

interface SelectProps extends AntdSelectProps {
  label?: string
}

export default function Select({ label, ...props }: SelectProps) {
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
      <AntdSelect className="block w-full border-rp-grey-400 px-3.5 py-2.5 text-rp-grey-700 shadow-input focus:border-rp-primary" />
    </div>
  )
}
