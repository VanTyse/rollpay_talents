"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Checkbox from "@/components/general/Checkbox"
import Link from "next/link"

export default function NotificationsSettingsPage() {
  return (
    <main
      className="bg-red fixed left-0 top-0 z-10 h-[calc(100lvh-105px)] w-dvw overflow-auto rounded-2xl bg-white px-4 py-6 md:static
        md:h-auto md:w-auto md:px-0"
    >
      <div className="relative mb-8 flex items-center md:hidden">
        <Link href={"/app/settings"}>
          <Icon name="left_arrow" />
        </Link>
        <h1 className="relative -left-4 flex-1 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Notifications
        </h1>
      </div>

      <h1 className="mb-10 text-sm md:px-4">Select how you’ll be notified.</h1>
      <div className="px-4">
        <div className="flex flex-col gap-4 border-b border-b-rp-grey-1600 pb-4">
          <h1 className="font-medium text-rp-grey-300">
            A request is accepted
          </h1>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span className="text-sm font-medium">In-App</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span className="text-sm font-medium">Email</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-b border-b-rp-grey-1600 py-4">
          <h1 className="font-medium text-rp-grey-300">
            A request is accepted
          </h1>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span className="text-sm font-medium">In-App</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span className="text-sm font-medium">Email</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h1 className="font-medium text-rp-grey-300">
            A request is accepted
          </h1>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span className="text-sm font-medium">In-App</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span className="text-sm font-medium">Email</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
