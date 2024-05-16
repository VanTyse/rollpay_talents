"use client"

import Icon from "@/components/Icons/Icon"
import SearchInput from "@/components/general/SearchInput"
import PaperworkTable from "./PaperworkTable"
import { useContext } from "react"
import { PaperworkContext } from "@/lib/context/PaperworkContext"

export default function PaperworkPage() {
  const { paperworks, query, setQuery } = useContext(PaperworkContext)
  return (
    <main className="min-h-dvh px-4 py-4 pb-32 md:pb-0 lg:px-0 lg:py-6">
      <header className="mb-4 flex items-start justify-between pt-6 md:mb-4 md:pb-3 lg:bg-inherit lg:px-4">
        <div>
          <h1 className="mb-1 font-space_grotesk text-xl font-bold text-rp-grey-200 md:text-[30px]">
            Paperwork
          </h1>
          <h3>Manage all paperwork here</h3>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <button className="flex items-center gap-2 rounded-lg border border-rp-green-mint px-4 py-2.5 shadow-input">
            <Icon name="import_icon" />
            <span className="text-sm font-medium text-rp-grey-200">Import</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-rp-green-mint px-4 py-2.5 shadow-input">
            <Icon name="export_icon" />
            <span className="text-sm font-medium text-rp-grey-200">Export</span>
          </button>
        </div>
      </header>

      <SearchInput
        value={query}
        onChange={(e) => setQuery && setQuery(e.target.value)}
        className="block w-full bg-inherit focus:outline-none"
        containerClassname="w-full rounded-full mb-6 bg-white"
        placeholder="Search documents in this project"
      />

      <PaperworkTable paperworks={paperworks} />
    </main>
  )
}
