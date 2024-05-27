"use client"

import Icon from "../Icons/Icon"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useViewPort } from "@/lib/hooks/useViewport"
import { NavItem } from "@/lib/types"
export default function BottomMavigation() {
  const currentPath = usePathname()
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
    <nav className="fixed bottom-0 left-0 z-10 w-full rounded-t-3xl bg-white px-6 pb-10 pt-4 shadow-bottom_nav lg:hidden">
      <div className="flex items-center justify-between">
        {nav_items.map((item, index) => {
          const active =
            (currentPath === "/app" && item.href !== "/app") ||
            (currentPath !== "/app" && item.href === "/app")
              ? false
              : currentPath.includes(item.href)
          return (
            <Link
              href={item.href}
              className={`flex flex-col items-center gap-1.5 ${active ? "text-rp-blue-dark" : "text-rp-grey-900"}`}
              key={index}
            >
              <div
                className={`${active ? "text-rp-green-100" : "text-rp-grey-900"}`}
              >
                <Icon name={item.icon_name} width={20} height={20} />
              </div>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
