"use client"
import { useContext, useMemo, useState } from "react"

import alphabetToNumber from "@/lib/utils/alphabetToNumber"
import { twMerge } from "tailwind-merge"
import Icon from "../Icons/Icon"
import Modal from "../general/Modal"
import { Project } from "@/lib/types"
import { ProjectContext } from "@/lib/context/ProjectContext"

export default function Projects() {
  const { selectedProject, updateSelectedProject, projects } =
    useContext(ProjectContext)

  const [showProjectOptions, setShowProjectOptions] = useState(false)
  const selectProject = (project: Project) => {
    updateSelectedProject && updateSelectedProject(project)
    setShowProjectOptions(false)
  }
  if (selectedProject)
    return (
      <div>
        <div
          className="mb-6 flex cursor-pointer items-center gap-2"
          onClick={() => setShowProjectOptions(true)}
        >
          <ProfileLetter name={selectedProject.name} className="rounded-lg" />
          <div className="flex items-center">
            <p className="font-bold text-rp-grey-1100">
              {selectedProject.name}
            </p>
            <Icon name="caret_down" />
          </div>
        </div>
        <ProjectOptionsModal
          projects={projects}
          show={showProjectOptions}
          selectProject={selectProject}
          closeModal={() => setShowProjectOptions(false)}
        />
      </div>
    )
}

export const ProfileLetter = ({
  name,
  className,
}: {
  name: string
  className?: string
}) => {
  const colors = ["#111827", "#F79009", "#4B4EFC"]
  const letter = name.charAt(0).toLowerCase()
  const number = alphabetToNumber(letter) - 1

  const color = useMemo(() => {
    return colors[number % 3]
  }, [number, name])

  return (
    <div
      style={{ background: color }}
      className={twMerge(
        "flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold capitalize text-white",
        className
      )}
    >
      {letter}
    </div>
  )
}

const ProjectOptionsModal = ({
  show,
  projects,
  closeModal,
  selectProject,
}: {
  projects: Project[]
  show: boolean
  closeModal: () => void
  selectProject: (project: Project) => void
}) => {
  return (
    <Modal show={show} closeModal={closeModal}>
      <div className="absolute top-[220px] flex w-[360px] flex-col gap-4 rounded-lg bg-white px-4 py-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex cursor-pointer items-center justify-between"
            onClick={() => selectProject(project)}
          >
            <div className="flex items-center gap-4">
              <ProfileLetter name={project.name} />
              <p className="font-bold text-rp-grey-1100">{project.name}</p>
            </div>
            <Icon name="three_dot_menu" />
          </div>
        ))}
      </div>
    </Modal>
  )
}
