"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Link from "next/link"

export default function ChangePasswordPage() {
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
          Change Password
        </h1>
      </div>

      <h1 className="mb-10 max-w-[343px] text-sm md:px-4">
        Please enter your current password to change your password.
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 border-b-rp-grey-1600 pb-6 md:px-4">
          <fieldset className="basis-1/2">
            <TextInput label={"Current password"} type="password" />
          </fieldset>

          <fieldset className="basis-1/2">
            <TextInput label={"New password"} type="password" />
          </fieldset>
          <fieldset className="basis-1/2">
            <TextInput label={"Confirm new password"} type="password" />
          </fieldset>
          <Button variant="primary" className="mt-4 w-full">
            Update Password
          </Button>
        </div>
      </form>
    </main>
  )
}
