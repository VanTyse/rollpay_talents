"use client"

import authController from "@/app/auth/base"
import { useSession } from "@/app/auth/useSession"
import { CUSTOM_EVENTS } from "@/lib/constants"
import router from "next/router"
import { useEffect } from "react"
import { twMerge } from "tailwind-merge"

export default function PageLoader({ className }: { className?: string }) {
  const { session, logout } = useSession()

  useEffect(() => {
    if (!session) logout()
  }, [session])

  return (
    <div
      className={twMerge(
        `fixed left-0 top-0 z-50 flex h-[100dvh] w-[100dvw] items-center justify-center text-3xl`,
        className
      )}
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ADB5C3"
        className="scale-150"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </div>
  )
}
