"use client"

import Icon from "@/components/Icons/Icon"
import SearchInput from "@/components/general/SearchInput"
import PaperworkTable from "./PaperworkTable"
import { useContext, useMemo, useState } from "react"
import { PaperworkContext } from "@/lib/context/PaperworkContext"
import { useViewPort } from "@/lib/hooks/useViewport"
import usePagination from "@/lib/hooks/usePagination"
import Pagination from "@/components/general/Pagination"
import { UploadPaperworkModal } from "./UploadPaperworkModal"
import Button from "@/components/general/Button"
import { ProjectContext } from "@/lib/context/ProjectContext"

export default function PaperworkPage() {
  const { selectedProject } = useContext(ProjectContext)
  const { paperworks, query, setQuery } = useContext(PaperworkContext)
  const { width } = useViewPort()
  const [showUploadPaperworkModal, setShowUploadPaperworkModal] =
    useState(false)

  const isButtonDisabled = useMemo(() => !!!selectedProject, [])

  const {
    paginatedItems: paginatedPaperworks,
    currentPage,
    setPage,
    lastPage,
  } = usePagination({
    items: paperworks,
    enabled: width > 768,
  })
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
          <button
            className="flex items-center gap-2 rounded-lg border border-rp-green-mint px-4 py-2.5 shadow-input 
            disabled:opacity-50 disabled:hover:cursor-not-allowed"
            onClick={() => setShowUploadPaperworkModal(true)}
            disabled={isButtonDisabled}
          >
            <Icon name="export_icon" />
            <span className="text-sm font-medium text-rp-grey-200">Upload</span>
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

      <div className="flex flex-col gap-10">
        <PaperworkTable paperworks={paginatedPaperworks} />
        <div className="hidden lg:block">
          <Pagination
            currentPage={currentPage}
            setPage={setPage}
            lastPage={lastPage}
          />
        </div>
        <Button
          variant="primary"
          className="fixed bottom-[120px] left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full text-sm lg:hidden"
          onClick={() => setShowUploadPaperworkModal(true)}
          disabled={isButtonDisabled}
        >
          <Icon
            name="export_icon"
            color={isButtonDisabled ? "#6B7280" : "white"}
          />

          <span>Upload Paperwork</span>
        </Button>
      </div>
      <UploadPaperworkModal
        closeModal={() => setShowUploadPaperworkModal(false)}
        show={showUploadPaperworkModal}
      />
    </main>
  )
}
