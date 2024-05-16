"use client"

import { settings_nav_items } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LogoutModal } from "./LogoutModal"

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentPath = usePathname()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  return (
    <div className="bg-white md:bg-inherit md:pb-16">
      <h1 className="mb-6 pl-4 pt-6 font-space_grotesk text-xl font-bold text-rp-grey-200 md:text-[30px]">
        Settings
      </h1>
      <div className="h-screen gap-x-7 md:grid md:h-auto md:grid-cols-[minmax(375px,_25vw)_1fr] md:items-start">
        <div className="rounded-2xl border-t-2 border-white bg-white py-2">
          {settings_nav_items.map((nav_item) => {
            const active = currentPath.includes(nav_item.href)
            return (
              <Link
                key={nav_item.href}
                href={nav_item.href}
                className={`block  border-b border-b-rp-grey-500  border-r-rp-green-100 p-6 capitalize text-[#596780] first-of-type:py-5 last-of-type:border-b-0 ${active && "border-r-2 font-semibold text-rp-blue-dark"}`}
              >
                {nav_item.name}
              </Link>
            )
          })}
          <div
            className="cursor-pointer border-b border-t border-rp-grey-500 px-6 py-5 md:border-b-0"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </div>
        </div>
        {/*  */}
        <div className="">{children}</div>
      </div>
      <LogoutModal
        show={showLogoutModal}
        closeModal={() => setShowLogoutModal(false)}
      />
    </div>
  )
}
