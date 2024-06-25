"use client"

import Image from "next/image"
import Icon from "../Icons/Icon"
import { ProfileLetter } from "./Projects"

import { Project } from "@/lib/types"
import { useContext, useState } from "react"
import { ProjectContext } from "@/lib/context/ProjectContext"

export default function Header() {
  const { projects, selectedProject, updateSelectedProject } =
    useContext(ProjectContext)
  const [showProjectOptions, setShowProjectOptions] = useState(false)
  const selectProject = (project: Project) => {
    updateSelectedProject && updateSelectedProject(project)
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
            <ProfileLetter name={selectedProject.name} className="rounded-lg" />
          )}
          <div className="flex items-center">
            <p className="text-xl font-bold text-rp-grey-1100">
              {selectedProject ? selectedProject.name : "No projects yet"}
            </p>
            <Icon name="caret_down" />
          </div>
        </div>
      </div>

      <h1 className="hidden font-space_grotesk text-[30px] font-bold text-rp-grey-200 lg:block">
        Hi, Ayomide
      </h1>
      <div className="flex items-center gap-10">
        {/* <Icon name="bell" /> */}
        <Image width={40} height={40} src={"/images/avatar.png"} alt="avatar" />
      </div>
    </header>
  )
}
