"use client"

import Icon from "@/components/Icons/Icon"
import DragandDrop from "@/components/forms/DragandDrop"
import Select from "@/components/forms/Select"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Avatar from "@/components/general/Avatar"
import { AuthContext, UserDetails } from "@/lib/context/AuthContext"
import { UtilsContext } from "@/lib/context/UtilsContext"
import validateObject from "@/lib/utils/validateObject"
import useAxios from "@/lib/hooks/useAxios"
import newAxios from "axios"
import { toast } from "sonner"
import { useSession } from "@/app/auth/useSession"

interface FormType {
  firstName: string
  lastName: string
  sex: "male" | "female" | null
  region: string | null
  avatar: string | null
  invoiceMeta?: {
    companyName: string
    companyAddress: string
    companyCity: string
    companyState: string
    companyZip: string
    companyCountry: string
    companyEmail: string
    companyPhone: string
    slogan: string
  }
}

export default function ProfilePage() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const navigate = (href: string) => router.push(href)
  const axios = useAxios({})
  const { userDetails } = useContext(AuthContext)
  const { countries } = useContext(UtilsContext)
  const { session, updateSession } = useSession()

  const countriesOptions = useMemo(
    () =>
      countries.map((country) => ({
        value: country.name,
        label: country.name,
      })),
    [countries]
  )

  const genderOptions = useMemo(
    () => [
      { label: "male", value: "male" },
      { label: "female", value: "female" },
    ],
    []
  )

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option: any) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState<FormType>({
    firstName: "",
    lastName: "",
    sex: null,
    region: "",
    avatar: "",
  })

  useEffect(() => {
    if (!userDetails) return
    setFormValues({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      sex: userDetails.sex,
      region: userDetails.region,
      avatar: userDetails.avatar,
    })
  }, [userDetails])

  const handleFileUpload = async () => {
    console.log(file)
    if (file) {
      const fileName = `${file.name}_${Date.now()}`

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
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateUserDetails = async () => {
    handleFileUploadToS3().then((res) => {
      console.log(res)
      axios
        .patch(`/user/profile`, {
          ...formValues,
          avatar: res?.url,
        })
        .then((response) => {
          setLoading(false)
          console.log(response)
          toast.success("User details updated successfully")
          const newUserDetails = response.data.data as UserDetails
          if (session) {
            const newSession = {
              ...session,
              user: {
                ...session.user,
                ...newUserDetails,
              },
            }

            updateSession(newSession)
          }
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
          toast.error("Something went wrong")
        })
    })
  }
  return (
    <main
      className="bg-red fixed left-0 top-0 z-10 h-[calc(100lvh-105px)] w-dvw overflow-auto rounded-2xl bg-white px-4 py-6 md:static
        md:h-auto md:w-auto md:px-0"
    >
      <div className="mb-8 flex items-center md:hidden">
        <Link
          href="/app/settings"
          onClick={() => console.log("clicked")}
          className="relative z-10"
        >
          <Icon name="left_arrow" />
        </Link>
        <h1 className="relative -left-6 flex-1 text-center font-space_grotesk text-2xl font-bold text-rp-grey-200">
          Profile
        </h1>
      </div>
      <div className="mb-6 flex justify-center md:hidden">
        <Image src={"/images/avatar.png"} width={64} height={64} alt="" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 border-b border-b-rp-grey-1600 pb-6 md:px-4">
          <div className="flex flex-col gap-6 md:flex-row">
            <fieldset className="basis-1/2">
              <TextInput
                label={"First name"}
                value={formValues.firstName}
                onChange={(e) =>
                  setFormValues((v) => ({ ...v, firstName: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="basis-1/2">
              <TextInput
                label={"Last name"}
                value={formValues.lastName}
                onChange={(e) =>
                  setFormValues((v) => ({ ...v, lastName: e.target.value }))
                }
              />
            </fieldset>
          </div>
          <fieldset className="basis-1/2">
            {/* <TextInput label={"Role"} /> */}
            <Select
              label={"Gender"}
              options={genderOptions}
              defaultValue={formValues.sex}
              value={formValues.sex}
              onSelect={(value) => setFormValues((v) => ({ ...v, sex: value }))}
            />
          </fieldset>
          <div className="hidden items-start gap-5 md:flex">
            {userDetails && (
              <Avatar
                firstName={userDetails.firstName}
                avatar={userDetails.avatar}
              />
            )}
            <div className="flex-1 rounded-xl border border-rp-grey-1600">
              <DragandDrop
                file={file}
                showUploadList={false}
                setFile={setFile}
                beforeUpload={(file) => {
                  setFile(file)
                  return false //so ant design doesn't upload the file
                }}
                className="!bg-white px-4 py-6"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="mb-2 flex aspect-square h-10 w-10 items-center justify-center rounded-full border-[6px] border-rp-grey-1000 bg-rp-grey-1400">
                    <Icon name="export_icon" />
                  </div>
                  <h1 className="text-sm font-medium">
                    <span className="text-rp-green-100">Click to upload</span>{" "}
                    or drag and drop
                  </h1>
                  <h3>SVG, PNG, JPG or GIF (max. 800x400px)</h3>
                </div>
              </DragandDrop>
            </div>
          </div>
          <fieldset className="basis-1/2">
            <Select
              showSearch
              label={"Country"}
              options={countriesOptions}
              filterOption={filterOption}
              defaultValue={formValues.region}
              value={formValues.region}
              onSelect={(value) =>
                setFormValues((v) => ({ ...v, region: value }))
              }
            />
          </fieldset>
          {/* <fieldset className="basis-1/2">
            <Select label={"Timezone"} />
          </fieldset> */}
        </div>
        <div className="flex justify-end">
          <div className="flex gap-6">
            <Button
              variant="secondary"
              onClick={() => navigate("/app/settings")}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateUserDetails}>
              Save changes
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}
