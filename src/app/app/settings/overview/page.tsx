"use client"

import Icon from "@/components/Icons/Icon"
import Link from "next/link"
import { useContext, useState } from "react"
import ProjectsTable from "./ProjectsTable"
import { ProjectContext } from "@/lib/context/ProjectContext"

export default function OverviewPage() {
  const [selectedTab, setSelectedTab] = useState<"projects" | "invoices">(
    "projects"
  )
  const { projects } = useContext(ProjectContext)

  return (
    <main
      className="bg-red fixed left-0 top-0 z-10 h-[calc(100lvh-105px)] w-dvw overflow-auto rounded-2xl bg-white px-4 py-6 md:static md:h-auto md:w-auto
        md:bg-inherit md:px-0 md:py-0"
    >
      <div className="relative mb-8 flex items-center md:hidden">
        <Link href={"/app/settings"}>
          <Icon name="left_arrow" />
        </Link>
        <h1 className="relative -left-4 flex-1 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Overview
        </h1>
      </div>
      <div className="mb-4 flex flex-col gap-2 md:flex-col-reverse md:gap-4">
        <div className="relative flex flex-col gap-2 rounded-2xl bg-rp-primary px-4 py-6 text-rp-grey-1200 md:gap-16 md:px-6 md:py-10">
          <div className="flex items-center justify-between">
            <h1 className="text-xs md:text-base">Total Earnings</h1>
            <div className="relative z-10">
              <Icon name="info" />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-rp-grey-600 md:text-2xl lg:text-3xl">
            N30,000,000
          </h1>
          <img
            src="/images/logo_icon_blue.png"
            className="absolute right-5 top-1/2 h-auto max-w-[25%] -translate-y-1/2"
            alt=""
          />
        </div>
        <div className="relative flex flex-col gap-2 rounded-2xl bg-rp-blue-dark px-4 py-6 text-rp-purple-200 md:gap-16 md:px-20 md:py-12">
          <div className="z-10 flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="text-xs md:text-base">Projects</h3>
              <h1 className="text-2xl font-semibold text-rp-grey-600 md:text-2xl md:text-[40px]">
                1
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xs md:text-base">Departments</h3>
              <h1 className="text-2xl font-semibold text-rp-grey-600 md:text-2xl md:text-[40px]">
                18
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xs md:text-base">Completed Projects</h3>
              <h1 className="text-2xl font-semibold text-rp-grey-600 md:text-2xl md:text-[40px]">
                2
              </h1>
            </div>
          </div>

          <img
            src="/images/logo_icon_dark.png"
            className="absolute right-5 top-1/2 h-auto max-w-[25%] -translate-y-1/2 md:max-w-[20%]"
            alt=""
          />
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 border-b border-rp-grey-500">
        <button
          onClick={() => setSelectedTab("projects")}
          className={`flex basis-1/2 justify-center py-2 
          ${selectedTab === "projects" && "border-b-2 border-rp-green-mint font-semibold text-rp-blue-dark"}`}
        >
          Projects
        </button>
        <button
          onClick={() => setSelectedTab("invoices")}
          className={`flex basis-1/2 justify-center py-2 
          ${selectedTab === "invoices" && "border-b-2 border-rp-green-mint font-semibold text-rp-blue-dark"}`}
        >
          Invoices
        </button>
      </div>
      <div>
        {selectedTab === "invoices" ? (
          <div></div>
        ) : selectedTab === "projects" ? (
          <div className="bg-white py-6 md:px-2">
            {" "}
            <ProjectsTable projects={projects} />
          </div>
        ) : null}
      </div>
    </main>
  )
}
