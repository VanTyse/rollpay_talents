"use client"

import Icon from "@/components/Icons/Icon"
import DragandDrop from "@/components/forms/DragandDrop"
import Select from "@/components/forms/Select"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const navigate = (href: string) => router.push(href)
  return (
    <main
      className="bg-red fixed left-0 top-0 z-10 h-[calc(100lvh-105px)] w-dvw overflow-auto rounded-2xl bg-white px-4 py-6 md:static
        md:h-auto md:w-auto md:px-0"
    >
      <div className="mb-8 flex items-center md:hidden">
        <Link
          href="/app/settings"
          onClick={() => console.log("clicked")}
          className="relative z-10"
        >
          <Icon name="left_arrow" />
        </Link>
        <h1 className="relative -left-6 flex-1 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Profile
        </h1>
      </div>
      <div className="mb-6 flex justify-center md:hidden">
        <Image src={"/images/avatar.png"} width={64} height={64} alt="" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 border-b border-b-rp-grey-1600 pb-6 md:px-4">
          <div className="flex flex-col gap-6 md:flex-row">
            <fieldset className="basis-1/2">
              <TextInput label={"First name"} />
            </fieldset>
            <fieldset className="basis-1/2">
              <TextInput label={"Last name"} />
            </fieldset>
          </div>
          <fieldset className="basis-1/2">
            <TextInput label={"Role"} />
          </fieldset>
          <div className="hidden items-start gap-5 md:flex">
            <Image src={"/images/avatar.png"} width={64} height={64} alt="" />
            <div className="flex-1 rounded-xl border border-rp-grey-1600">
              <DragandDrop
                file={file}
                setFile={setFile}
                beforeUpload={(file) => setFile(file)}
                className="!bg-white px-4 py-6"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="mb-2 flex aspect-square h-10 w-10 items-center justify-center rounded-full border-[6px] border-rp-grey-1000 bg-rp-grey-1400">
                    <Icon name="export_icon" />
                  </div>
                  <h1 className="text-sm font-medium">
                    <span className="text-rp-green-100">Click to upload</span>{" "}
                    or drag and drop
                  </h1>
                  <h3>SVG, PNG, JPG or GIF (max. 800x400px)</h3>
                </div>
              </DragandDrop>
            </div>
          </div>
          <fieldset className="basis-1/2">
            <Select label={"Country"} />
          </fieldset>
          <fieldset className="basis-1/2">
            <Select label={"Timezone"} />
          </fieldset>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-6">
            <Button
              variant="secondary"
              onClick={() => navigate("/app/settings")}
            >
              Cancel
            </Button>
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
      </form>
    </main>
  )
}
