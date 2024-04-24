"use client"

import { nav_items } from "@/lib/constants"
import Icon from "../Icons/Icon"
import SearchInput from "../general/SearchInput"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Projects from "./Projects"
import Image from "next/image"

export default function Sidebar() {
  const currentPath = usePathname()
  return (
    <aside className="hidden h-dvh flex-col justify-between bg-white lg:flex">
      <div>
        <div className="border-b px-6 py-8">
          <div className="mb-14">
            <Icon name="logo" />
          </div>
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
        <div className="flex justify-between border-t border-[#E4E7EC] pt-6">
          <div className="flex gap-3">
            <Image
              width={40}
              height={40}
              src={"/images/avatar.png"}
              alt="avatar"
            />
            <div>
              <h1 className="text-sm font-medium">Ayo Dahunsi</h1>
              <h3 className="text-xs">ayo@rollpay.com</h3>
            </div>
          </div>
          <Link href={"/auth/signin"} className="hover:cursor-pointer">
            <Icon name="logout" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
