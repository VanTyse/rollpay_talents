import { InputProps } from "@/lib/types"
import Icon from "../Icons/Icon"
import { twMerge } from "tailwind-merge"

interface SearchInputProps extends InputProps {
  containerClassname?: string
}

export default function SearchInput(props: SearchInputProps) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-2 rounded-md border border-rp-grey-border px-3 py-2.5 focus-within:border-rp-primary",
        props.containerClassname
      )}
    >
      <div className="min-w-[20px]">
        <Icon name="lens" />
      </div>
      <input
        type="text"
        className="block max-w-[180px] focus:outline-none"
        {...props}
      />
    </div>
  )
}
