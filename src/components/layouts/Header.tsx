"use client"

import Image from "next/image"
import Icon from "../Icons/Icon"
import { ProfileLetter } from "./Projects"
import { projects } from "@/lib/mockData"
import { Project } from "@/lib/types"
import { useState } from "react"

export default function Header() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects[0]
  )
  const [showProjectOptions, setShowProjectOptions] = useState(false)
  const selectProject = (project: Project) => {
    setSelectedProject(project)
    setShowProjectOptions(false)
  }
  return (
    <header className="flex items-center justify-between bg-white px-4 pb-3 pt-6 lg:bg-inherit lg:px-0 lg:pb-0 lg:pt-0">
      <div className="flex lg:hidden">
        <div
          className="flex cursor-pointer items-center gap-2"
          // onClick={() => setShowProjectOptions(true)}
        >
          {selectedProject && (
            <ProfileLetter
              name={selectedProject.project_name}
              className="rounded-lg"
            />
          )}
          <div className="flex items-center">
            <p className="text-rp-grey-1100 text-xl font-bold">
              {selectedProject
                ? selectedProject.project_name
                : "No projects yet"}
            </p>
            <Icon name="caret_down" />
          </div>
        </div>
      </div>

      <h1 className="hidden font-space_grotesk text-[30px] font-bold text-rp-grey-200 lg:block">
        Hi, Ayomide
      </h1>
      <div className="flex items-center gap-10">
        <Icon name="bell" />
        <Image width={40} height={40} src={"/images/avatar.png"} alt="avatar" />
      </div>
    </header>
  )
}
