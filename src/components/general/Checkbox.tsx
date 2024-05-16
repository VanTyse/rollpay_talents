import {
  Checkbox as AntdCheckbox,
  CheckboxProps as AntdCheckboxProps,
} from "antd"
import { twMerge } from "tailwind-merge"
import Icon from "../Icons/Icon"

interface CheckboxProps {
  containerClassName?: string
  className?: string
  checked: boolean
}

export default function Checkbox({
  className,
  containerClassName,
  checked,
}: CheckboxProps) {
  // return <AntdCheckbox {...props} />

  return (
    <button
      className={twMerge(
        `flex items-center justify-center ${checked && "bg-rp-green-100"} aspect-square h-4 w-4 rounded-[4px]`,
        containerClassName
      )}
    >
      {checked && <Icon name="tick" color="white" />}
    </button>
  )
}
