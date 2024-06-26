"use client"

import Icon from "../Icons/Icon"
import SearchInput from "../general/SearchInput"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Projects from "./Projects"
import Image from "next/image"
import Avatar from "../general/Avatar"
import { useContext } from "react"
import { AuthContext } from "@/lib/context/AuthContext"
import { useSession } from "@/app/auth/useSession"
import { useViewPort } from "@/lib/hooks/useViewport"
import { NavItem } from "@/lib/types"

export default function Sidebar() {
  const currentPath = usePathname()
  const { userDetails } = useContext(AuthContext)
  const { logout } = useSession()
  const { width, height } = useViewPort()
  const nav_items: NavItem[] = [
    {
      name: "home",
      icon_name: "home",
      href: "/app",
    },
    {
      name: "payments",
      icon_name: "coins",
      href: "/app/payments",
    },
    {
      name: "paperwork",
      icon_name: "paperwork",
      href: "/app/paperwork",
    },
    {
      name: "settings",
      icon_name: "settings",
      href: width > 768 ? "/app/settings/profile" : "/app/settings",
    },
  ]

  return (
    <aside className="hidden h-dvh flex-col justify-between bg-white lg:flex">
      <div>
        <div className="border-b px-6 py-8">
          <Link href={"/app"}>
            <div className="mb-14">
              <Icon name="logo" />
            </div>
          </Link>
          <SearchInput />
        </div>
        <div className="pl-6 pt-8">
          <Projects />
          <div>
            {nav_items.map((item) => {
              const active =
                (currentPath === "/app" && item.href !== "/app") ||
                (currentPath !== "/app" && item.href === "/app")
                  ? false
                  : currentPath.includes(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-2 py-3 font-medium capitalize text-rp-grey-900 
              ${active && "border-r-4 border-rp-green-mint bg-rp-grey-1000 text-[#111827]"}`}
                >
                  <Icon name={item.icon_name} width={24} height={24} />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between gap-3 border-t border-[#E4E7EC] pt-6">
          <div className="flex gap-3">
            {userDetails && (
              <Avatar
                avatar={userDetails?.avatar}
                firstName={userDetails.firstName}
              />
            )}
            <div>
              <h1 className="text-sm font-medium capitalize">
                {userDetails?.firstName} {userDetails?.lastName}
              </h1>
              <h3 className="w-[150px] truncate text-xs">
                {userDetails?.email}
              </h3>
            </div>
          </div>
          <button onClick={logout}>
            <Icon name="logout" />
          </button>
        </div>
      </div>
    </aside>
  )
}
