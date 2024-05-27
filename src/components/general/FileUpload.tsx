import Button from "./Button"
import { useRef, useState, useMemo, useEffect, type ChangeEvent } from "react"

export const FileUpload = ({
  show,
  close,
  onFileChange,
  fileInputAccept,
}: {
  show: boolean
  close: () => void
  onFileChange: (file: File | null) => void
  fileInputAccept?: string
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInput = useMemo(
    () => fileInputRef.current && fileInputRef.current,
    [fileInputRef.current]
  )

  useEffect(() => {
    if (show && fileInput) fileInput.click()
  }, [fileInput, show])

  const reselect = () => {
    fileInput && fileInput.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setSelectedFile(file)
    }
  }

  const cancel = () => {
    close()
    setSelectedFile(null)
  }

  useEffect(() => {
    onFileChange(selectedFile)
  }, [selectedFile])

  return (
    <div className={`${!show && "hidden"}`}>
      <input
        className="hidden"
        type="file"
        id="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={fileInputAccept}
      />
      <div className="flex flex-col gap-6">
        <h1 className="flex flex-col items-center gap-1 text-xs">
          <h3>File Selected: </h3>
          <span className="font-space_grotesk font-semibold text-rp-grey-200">
            {selectedFile?.name}
          </span>
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            className="w-full border-rp-grey-700 bg-rp-grey-700 text-sm text-rp-grey-1700"
            onClick={reselect}
          >
            Reselect
          </Button>
          <Button
            variant="secondary"
            className="w-full border-rp-red-100 bg-rp-red-100 text-sm  text-white"
            onClick={cancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
