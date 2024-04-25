import { useState } from "react"
import Icon from "../Icons/Icon"
import Modal from "./Modal"
import { Project } from "@/lib/types"
import { projects } from "@/lib/mockData"
import { ProfileLetter } from "../layouts/Projects"
import TextArea from "../forms/TextArea"
import Checkbox from "./Checkbox"
import Button from "./Button"

interface Props {
  title?: string
  show: boolean
  closeModal: () => void
  modalClassName: string
}
export default function ({
  title = "Send Document",
  closeModal,
  show,
  modalClassName,
}: Props) {
  const [selectedprojects, setSelectedprojects] = useState<Project[]>([])
  const [showProjects, setShowProjects] = useState(false)

  const selectAProject = (project: Project) => {
    if (selectedprojects.find((p) => p.project_id === project.project_id)) {
      setShowProjects(false)
      return
    } else setSelectedprojects((p) => [...p, project])
    setShowProjects(false)
  }

  const removeAproject = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    project: Project
  ) => {
    e.stopPropagation()
    setSelectedprojects((p) =>
      p.filter((p) => p.project_id !== project.project_id)
    )
  }

  return (
    <Modal show={show} closeModal={closeModal} className={modalClassName}>
      <div className="fixed left-1/2 top-1/2 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-4 md:py-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-space_grotesk text-xl font-bold text-rp-grey-200">
            {title}
          </h1>
          <button onClick={closeModal}>
            <Icon name="close" />
          </button>
        </div>
        <div className="mb-4">
          <h2 className="mb-1.5 text-sm font-medium text-rp-grey-300">To</h2>
          <div
            className="relative flex min-h-[40px] w-full flex-wrap items-center gap-3 rounded-2xl border-2 border-rp-grey-border px-3.5 py-2.5 shadow-input"
            onClick={() => setShowProjects((x) => !x)}
          >
            {selectedprojects.map((project, index) => {
              return (
                <div
                  className="border-rp-green-100 flex w-fit items-center gap-1 rounded-full border p-0.5 px-1"
                  key={index}
                >
                  <ProfileLetter
                    name={project.project_name}
                    className="aspect-square h-5 w-5 rounded-full text-xs"
                  />
                  <h1 className="text-sm font-medium text-rp-grey-300">
                    {project.project_name}
                  </h1>
                  <button onClick={(e) => removeAproject(e, project)}>
                    <Icon name="close" />
                  </button>
                </div>
              )
            })}
            {showProjects && <Projects selectProject={selectAProject} />}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="mb-1.5 text-sm font-medium text-rp-grey-300">Note</h2>
          <TextArea placeholder="Type here..." className="h-28"></TextArea>
        </div>
        <div className="mb-4 w-full border-[.5px] border-rp-grey-border"></div>
        <div className="border-rp-green-100 mb-4 flex items-center gap-4 rounded-2xl border px-[18px] py-4">
          <div className="bg-rp-green-200 flex aspect-square h-10 w-10 items-center justify-center rounded-full">
            <Icon name="file" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm text-rp-grey-200">Invoice.pdf</h1>
            <h3 className="text-xs">200 KB </h3>
          </div>
          <Checkbox checked />
        </div>
        <Button variant="primary" className="w-full">
          Send
        </Button>
      </div>
    </Modal>
  )
}

const Projects = ({
  selectProject,
}: {
  selectProject: (project: Project) => void
}) => {
  return (
    <div
      className=" shadow-large absolute left-2 top-2 min-w-[300px] rounded-2xl bg-white px-4 py-2"
      onClick={(e) => e.stopPropagation()}
    >
      {projects.map((project, index) => {
        return (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-2 py-2"
            onClick={() => selectProject(project)}
          >
            <ProfileLetter name={project.project_name} />
            <h1 className="text-rp-grey-1100 text-xs font-semibold">
              {project.project_name}
            </h1>
          </div>
        )
      })}
    </div>
  )
}
