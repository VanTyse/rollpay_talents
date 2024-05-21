import { isAbsoluteUrl } from "next/dist/shared/lib/utils"
import Image from "next/image"

export default function Avatar({
  avatar,
  firstName,
  size,
}: {
  avatar: string | null
  firstName: string
  size?: number
}) {
  if (avatar && isAbsoluteUrl(avatar))
    return (
      <Image width={size ?? 40} height={size ?? 40} src={avatar} alt="avatar" />
    )
  else
    return (
      <div
        style={size ? { width: size, height: size } : {}}
        className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-rp-green-mint text-lg font-bold text-white"
      >
        {firstName && firstName?.charAt(0).toUpperCase()}
      </div>
    )
}
