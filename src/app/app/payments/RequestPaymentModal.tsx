"use client"

import Icon from "@/components/Icons/Icon"
import DatePicker from "@/components/forms/DatePicker"
import Select from "@/components/forms/Select"
import TextArea from "@/components/forms/TextArea"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Modal from "@/components/general/Modal"
import { AuthContext } from "@/lib/context/AuthContext"
import { ProjectContext } from "@/lib/context/ProjectContext"
import { UtilsContext } from "@/lib/context/UtilsContext"
import useAxios from "@/lib/hooks/useAxios"
import dataURItoFile from "@/lib/utils/dataURLtoFile"
import { Space_Grotesk } from "next/font/google"
import {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import newAxios from "axios"
import { toast } from "sonner"
import validateObject from "@/lib/utils/validateObject"
import { PaymentRequestContext } from "@/lib/context/PaymentRequestsContext"
import { useRouter } from "next/navigation"
import { FileUpload } from "@/components/general/FileUpload"

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

interface ModalProps {
  show: boolean
  closeModal: () => void
}

export default function RequestPaymentModal({ show, closeModal }: ModalProps) {
  const { selectedProject } = useContext(ProjectContext)
  const { refresh } = useContext(PaymentRequestContext)

  const { userDetails } = useContext(AuthContext)
  const { expenseCategories } = useContext(UtilsContext)

  const [optionSelected, setOptionSelected] = useState<
    "scan" | "upload" | null
  >(null)

  useEffect(() => {
    setOptionSelected(null)
  }, [show])
  const [formValues, setFormValues] = useState({
    subject: "",
    talentId: selectedProject?.talentId,
    companyId: selectedProject?.companyId,
    projectId: selectedProject?.id,
    amount: "",
    categoryId: "",
    dueDate: "",
    status: "pending",
    description: "",
  })

  useEffect(() => {
    if (userDetails && selectedProject)
      setFormValues((v) => ({
        ...v,
        talentId: selectedProject.talentId,
        companyId: selectedProject.companyId,
        projectId: selectedProject.id,
      }))
  }, [userDetails, selectedProject])

  const [file, setFile] = useState<File | null>(null)

  const [creating, setCreating] = useState<
    "success" | "failed" | "pending" | "default"
  >("default")

  const amountValue = useMemo(() => {
    return formatAmountString(formValues.amount)
  }, [formValues.amount])

  const axios = useAxios({})
  const router = useRouter()

  const handleFileUpload = async () => {
    if (file) {
      const fileName = `${Date.now()}_rollpay_file`

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
      } catch (error) {}
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
    } catch (error) {}
  }

  const handleRequestPayment = async () => {
    const inValidatedKeys = validateObject(formValues, [
      "amount",
      "categoryId",
      "description",
      "dueDate",
      "subject",
    ])
    if (inValidatedKeys.length > 0) {
      for (let key of inValidatedKeys) {
        toast.warning("Please enter a valid value for  " + key)
      }
      return
    }
    setCreating("pending")
    handleFileUploadToS3().then((res) => {
      axios
        .post(`/payment-requests`, {
          ...formValues,
          amount: +formValues.amount.replaceAll("N", "").replaceAll(",", ""),
          attachments: [
            {
              mime: res?.mime,
              link: res?.name,
            },
          ],
        })
        .then((response) => {
          setCreating("success")
          toast.success("Payment Request initiated successfully")
          refresh && refresh()
          router.push("/app/payments")
        })
        .catch((err) => {
          console.error(err)
          setCreating("failed")
          toast.error("Something went wrong")
        })
    })
  }

  const expenseOptions = useMemo(() => {
    return expenseCategories.map((category) => ({
      label: `${category.name.charAt(0).toUpperCase()}${category.name.slice(1)}`,
      value: category.id,
    }))
  }, [expenseCategories])

  if (creating === "pending")
    return (
      <Modal show={show} closeModal={closeModal}>
        <div className="fixed left-1/2 flex h-svh w-dvw max-w-[520px] -translate-x-1/2 items-center justify-center overflow-y-auto rounded-none bg-white p-4 md:top-1/2 md:max-h-[50dvh] md:w-[90%] md:-translate-y-1/2 md:rounded-2xl md:py-6">
          <div className="flex flex-col items-center gap-4">
            <Icon name="directory" />
            <span className="font-space_grotesk text-xl font-bold text-rp-blue-dark">
              Requesting payment...
            </span>
          </div>
        </div>
      </Modal>
    )

  return (
    <Modal show={show} closeModal={closeModal}>
      <div className="fixed left-1/2 h-svh w-dvw -translate-x-1/2 overflow-y-auto rounded-none bg-white p-4 md:top-1/2 md:max-h-[90dvh] md:w-[90%] md:max-w-[520px] md:-translate-y-1/2 md:rounded-2xl md:py-8">
        <div className="mb-4 flex items-center">
          <button onClick={closeModal}>
            <Icon name="left_arrow" />
          </button>
          <h1
            className={`flex-1 text-center text-xl font-bold text-rp-grey-200 md:text-2xl ${space_grotesk.className}`}
          >
            Request Payment
          </h1>
        </div>
        <h1 className="mb-4 text-sm">
          Fill out the form below to request payment for your services or
          expenses. Ensure all info are accurate
        </h1>
        <div
          className="flex flex-col gap-2"
          // onClick={(e) => e.preventDefault()}
        >
          <fieldset>
            <TextInput
              id="request-payment-input-subject"
              label={"Subject"}
              value={formValues.subject}
              onChange={(e) =>
                setFormValues((v) => ({ ...v, subject: e.target.value }))
              }
            />
          </fieldset>
          <fieldset>
            <TextInput
              id="request-payment-input-amount"
              label={"Amount"}
              value={amountValue}
              onChange={(e) => {
                setFormValues((v) => ({ ...v, amount: e.target.value }))
              }}
            />
          </fieldset>
          <fieldset>
            <DatePicker
              label={"Due Date"}
              onChange={(date) =>
                setFormValues((v) => ({
                  ...v,
                  dueDate: date.format("YYYY-MM-DD"),
                }))
              }
            />
          </fieldset>
          <fieldset>
            <Select
              label="Expense Category"
              options={expenseOptions}
              onSelect={(value) =>
                setFormValues((v) => ({ ...v, categoryId: value }))
              }
            />
          </fieldset>
          <fieldset>
            <TextArea
              id="request-payment-input-description"
              label={"Description"}
              className="h-40"
              value={formValues.description}
              onChange={(e) =>
                setFormValues((v) => ({ ...v, description: e.target.value }))
              }
            />
          </fieldset>
          <div className="rounded-lg border px-6 py-4">
            <Scan
              show={optionSelected === "scan"}
              close={() => setOptionSelected(null)}
              onFileChange={(file) => setFile(file)}
            />
            <FileUpload
              show={optionSelected === "upload"}
              close={() => setOptionSelected(null)}
              onFileChange={(file) => setFile(file)}
            />

            {!optionSelected && (
              <div>
                <div className="mb-1 flex justify-center gap-10">
                  <button
                    className="flex flex-col items-center gap-1"
                    onClick={() => setOptionSelected("scan")}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-[6px] border-rp-grey-1000 bg-rp-grey-1400">
                      <Icon name="camera" />
                    </div>
                    <span className="text-sm font-medium text-rp-grey-1500">
                      Scan
                    </span>
                  </button>

                  <button
                    className="flex flex-col items-center gap-1"
                    onClick={() => setOptionSelected("upload")}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-[6px] border-rp-grey-1000 bg-rp-grey-1400">
                      <Icon name="file" width={16} height={16} />
                    </div>
                    <span className="text-sm font-medium text-rp-grey-1500">
                      Upload
                    </span>
                  </button>
                </div>
                <p className="text-center text-xs">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            )}
          </div>
          <Button
            variant="primary"
            className="mt-2 w-full"
            onClick={handleRequestPayment}
          >
            Submit Request
          </Button>
        </div>
      </div>
    </Modal>
  )
}

const formatAmountString = (text: string) => {
  const stringWithNoNumbers = text.replace(/[^0-9]/g, "")
  const value = stringWithNoNumbers
    ? Number(stringWithNoNumbers).toLocaleString()
    : stringWithNoNumbers

  return `N${value}`
}

const Scan = ({
  show,
  close,
  onFileChange,
}: {
  show: boolean
  close: () => void
  onFileChange: (file: File) => void
}) => {
  const [picDetails, setPicDetails] = useState({
    width: 320,
    height: 0,
    src: "",
  })
  const [streaming, setStreaming] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [stream, setStream] = useState<MediaStream | null>(null)

  const canvas = useMemo(
    () => canvasRef.current && canvasRef.current,
    [canvasRef.current]
  )

  const videoRef = useRef<HTMLVideoElement>(null)

  const video = useMemo(
    () => videoRef.current && videoRef.current,
    [videoRef.current]
  )

  const photoRef = useRef<HTMLImageElement>(null)

  const photo = useMemo(
    () => photoRef.current && photoRef.current,
    [photoRef.current]
  )

  useEffect(() => {
    if (picDetails.src) {
      const fileName = `${Date.now()}-scannedDoc`
      const file = dataURItoFile(picDetails.src, fileName)
      onFileChange(file)
    }
  }, [picDetails.src])
  useEffect(() => {
    if (!video || !show) return
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream
        video.play()
        setStream(stream)
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`)
      })
  }, [video, show])

  useEffect(() => {
    if (!show && stream)
      stream.getTracks().forEach(function (track) {
        track.stop()
      })
  }, [show, stream])

  useEffect(() => {
    if (!video || !canvas) return
    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          const { width } = picDetails
          const newHeight = (video.videoHeight / video.videoWidth) * width
          setPicDetails((d) => ({ ...d, height: newHeight }))

          video.setAttribute("width", `${width}`)
          video.setAttribute("height", `${newHeight}`)
          canvas.setAttribute("width", `${width}`)
          canvas.setAttribute("height", `${newHeight}`)
          setStreaming(true)
        }
      },
      false
    )
  }, [video, canvas])

  function takepicture() {
    if (!canvas || !video || !photo) return
    const context = canvas.getContext("2d")
    const { width, height } = picDetails

    if (width && height) {
      canvas.width = width
      canvas.height = height
      context?.drawImage(video, 0, 0, width, height)

      const src = canvas.toDataURL("image/png")
      photo.setAttribute("src", src)
      setPicDetails((d) => ({ ...d, src }))
    } else {
      clearphoto()
    }
  }

  function clearphoto() {
    if (!canvas || !video || !photo) return
    const context = canvas.getContext("2d")
    if (context) context.fillStyle = "#AAA"
    context?.fillRect(0, 0, canvas.width, canvas.height)

    const src = canvas.toDataURL("image/png")
    photo.setAttribute("src", src)
    setPicDetails((d) => ({ ...d, src }))
  }
  return (
    <div className={`${!show && "hidden"} flex flex-col gap-4`}>
      <canvas ref={canvasRef} className="hidden"></canvas>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center gap-4">
          <video src="" ref={videoRef}>
            Video stream not available
          </video>
          <Button variant="neutral" onClick={takepicture}>
            Take photo
          </Button>
        </div>
        <div className="flex flex-col items-center justify-between gap-4">
          <img src="" alt="" ref={photoRef} />
          <Button variant="neutral" onClick={clearphoto}>
            Clear photo
          </Button>
        </div>
      </div>
      <Button
        variant="secondary"
        className="mx-auto w-3/5 py-2 text-xs"
        onClick={close}
      >
        Cancel
      </Button>
    </div>
  )
}
