import { useContext, useEffect, useState } from "react"
import Icon from "../Icons/Icon"
import Modal from "./Modal"
import { Invoice, Project } from "@/lib/types"

import { ProfileLetter } from "../layouts/Projects"
import TextArea from "../forms/TextArea"
import Checkbox from "./Checkbox"
import Button from "./Button"
import { ProjectContext } from "@/lib/context/ProjectContext"
import axios from "axios"
import useAxios from "@/lib/hooks/useAxios"
import { toast } from "sonner"

interface Props {
  title?: string
  show: boolean
  closeModal: () => void
  modalClassName: string
  invoice?: Invoice
}
export default function ({
  title = "Send Document",
  closeModal,
  show,
  modalClassName,
  invoice,
}: Props) {
  const { company, selectedProject } = useContext(ProjectContext)
  const [values, setValues] = useState<{
    recipients: {
      email: string
      name: string
    }[]
    note: string
  }>({
    recipients: [],
    note: "",
  })

  const axios = useAxios({})

  useEffect(() => {
    if (company)
      setValues((v) => ({
        ...v,
        recipients: [
          {
            email: company.email,
            name: company.name,
          },
        ],
      }))
  }, [company])
  const handleSend = async () => {
    try {
      const { data } = await axios.post(`/invoices/${invoice?.id}/send`, values)
      toast.success("Invoice sent")

      const event = new CustomEvent("close_all_invoice_modals")
      window.dispatchEvent(event)
      closeModal()
    } catch (error) {
      console.log(error)
    }
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
          <div className="relative flex min-h-[40px] w-full flex-wrap items-center gap-3 rounded-2xl border-2 border-rp-grey-border px-3.5 py-2.5 shadow-input">
            {selectedProject &&
              [selectedProject].map((project, index) => {
                return (
                  <div
                    className="flex w-fit items-center gap-1 rounded-full border border-rp-green-100 p-0.5 px-1"
                    key={index}
                  >
                    <ProfileLetter
                      name={project.name}
                      className="aspect-square h-5 w-5 rounded-full text-xs"
                    />
                    <h1 className="text-sm font-medium text-rp-grey-300">
                      {project.name}
                    </h1>
                    {/* <button onClick={(e) => removeAproject(e, project)}>
                    <Icon name="close" />
                  </button> */}
                  </div>
                )
              })}
            {/* {showProjects && <Projects selectProject={selectAProject} />} */}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="mb-1.5 text-sm font-medium text-rp-grey-300">Note</h2>
          <TextArea
            placeholder="Type here..."
            className="h-28"
            value={values.note}
            onChange={(e) => setValues((v) => ({ ...v, note: e.target.value }))}
          ></TextArea>
        </div>
        <div className="mb-4 w-full border-[.5px] border-rp-grey-border"></div>
        <div className="mb-4 flex items-center gap-4 rounded-2xl border border-rp-green-100 px-[18px] py-4">
          <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-rp-green-200">
            <Icon name="file" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm text-rp-grey-200">Invoice.pdf</h1>
            <h3 className="text-xs">200 KB </h3>
          </div>
          <Checkbox checked />
        </div>
        <Button variant="primary" className="w-full" onClick={handleSend}>
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
  const { selectedProject } = useContext(ProjectContext)
  const projects = selectedProject ? [selectedProject] : []
  return (
    <div
      className=" absolute left-2 top-2 min-w-[300px] rounded-2xl bg-white px-4 py-2 shadow-large"
      onClick={(e) => e.stopPropagation()}
    >
      {projects.map((project, index) => {
        return (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-2 py-2"
            onClick={() => selectProject(project)}
          >
            <ProfileLetter name={project.name} />
            <h1 className="text-xs font-semibold text-rp-grey-1100">
              {project.name}
            </h1>
          </div>
        )
      })}
    </div>
  )
}
