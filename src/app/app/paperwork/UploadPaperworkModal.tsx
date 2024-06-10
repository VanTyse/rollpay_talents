"use client"

import Icon from "@/components/Icons/Icon"
import Button from "@/components/general/Button"
import { FileUpload } from "@/components/general/FileUpload"
import Modal from "@/components/general/Modal"
import { ProjectContext } from "@/lib/context/ProjectContext"
import useAxios from "@/lib/hooks/useAxios"
import { useContext, useState } from "react"
import { toast } from "sonner"
import newAxios from "axios"
import getFileExtension from "@/lib/utils/getFileExtension"

interface ModalProps {
  show: boolean
  closeModal: () => void
}

export function UploadPaperworkModal({ show, closeModal }: ModalProps) {
  const [showFileUpload, setShowFileUpload] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { selectedProject, company } = useContext(ProjectContext)
  const axios = useAxios({})

  const handleFileUpload = async () => {
    if (file) {
      const fileName = file.name
      setLoading(true)

      try {
        const { data } = await axios.post("/utilities/file-upload", {
          fileName,
          fileType: file.type,
        })

        return {
          url: data.data as string,
          mime: file.type,
          name: fileName,
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleFileUploadToS3 = async () => {
    try {
      const res = await handleFileUpload()

      if (res) {
        // const binary = Buffer.from(await file!.arrayBuffer())
        await newAxios.put(`${res?.url}`, file, {
          headers: {
            "Content-Type": file?.type,
          },
        })

        return res
      }
    } catch (error) {
      console.log(error)
      toast.error("file upload failed")
      setLoading(false)
    }
  }

  const handleUpload = async () => {
    handleFileUploadToS3().then(async (res) => {
      if (!file) return toast.error("Please select a document")
      if (!res) return toast.error("Something went wrong during upload")
      const url = res.name.split("?")[0]
      try {
        const { data } = await axios.post(`/paperwork`, {
          name: res.name,
          description: file.name,
          status: "draft",
          companyId: company?.id,
          projectId: selectedProject?.id,
          url,
          type: getFileExtension(file.name),
        })
        setLoading(false)
        toast.success("Paperwork uploaded successfully")
        closeModal()
      } catch (error: any) {
        console.log(error)
        toast.error(
          error?.response?.data?.message ??
            error?.response?.data?.error?.message ??
            error?.message
        )
        setLoading(false)
      }
    })
  }

  return (
    <Modal show={show} closeModal={closeModal}>
      <div className="fixed left-1/2 top-1/2 w-[90%] max-w-[376px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-4 md:max-h-[90dvh] md:py-8">
        <h1 className="mb-4 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Upload Paperwork
        </h1>
        <h3 className="mb-10 text-center text-sm">
          Upload a signed copy of your document
        </h3>
        <div className="mb-8">
          {!showFileUpload && (
            <button
              className="flex h-24 w-full items-center rounded-xl bg-rp-grey-1000"
              onClick={() => setShowFileUpload(true)}
            >
              <div className="mx-auto flex flex-col items-center gap-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[6px] border-rp-grey-1000 bg-rp-grey-1400">
                  <Icon name="file" width={16} height={16} />
                </div>
                <span className="text-sm font-medium text-rp-grey-1500">
                  Select Document
                </span>
              </div>
            </button>
          )}
          <FileUpload
            show={showFileUpload}
            close={() => setShowFileUpload(false)}
            onFileChange={(file) => setFile(file)}
            fileInputAccept=".doc,.docx,.pdf,.txt"
          />
        </div>
        <Button
          variant="primary"
          className="mt-2 w-full"
          onClick={handleUpload}
          disabled={loading || !!!file}
        >
          Upload
        </Button>
      </div>
    </Modal>
  )
}
