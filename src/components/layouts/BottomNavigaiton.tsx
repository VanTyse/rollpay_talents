"use client"

import { nav_items } from "@/lib/constants"
import Icon from "../Icons/Icon"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function BottomMavigation() {
  const currentPath = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 z-10 w-full rounded-t-3xl bg-white px-6 pb-10 pt-4 shadow-bottom_nav lg:hidden">
      <div className="flex items-center justify-between">
        {nav_items.map((item) => {
          const active =
            (currentPath === "/app" && item.href !== "/app") ||
            (currentPath !== "/app" && item.href === "/app")
              ? false
              : currentPath.includes(item.href)
          return (
            <Link
              href={item.href}
              className={`flex flex-col items-center gap-1.5 ${active ? "text-rp-blue-dark" : "text-rp-grey-900"}`}
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
