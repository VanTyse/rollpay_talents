import { isAbsoluteUrl } from "next/dist/shared/lib/utils"
import Image from "next/image"

export default function Avatar({
  avatar,
  firstName,
}: {
  avatar: string | null
  firstName: string
}) {
  if (avatar && isAbsoluteUrl(avatar))
    return <Image width={40} height={40} src={avatar} alt="avatar" />
  else
    return (
      <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-rp-green-mint text-lg font-bold text-white">
        {firstName && firstName?.charAt(0).toUpperCase()}
      </div>
    )
}
