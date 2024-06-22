"use client"

import Icon from "@/components/Icons/Icon"
import TextInput from "@/components/forms/TextInput"
import Button from "@/components/general/Button"

import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"

import useAxios from "@/lib/hooks/useAxios"

import Select from "@/components/forms/Select"
import { UtilsContext } from "@/lib/context/UtilsContext"
import { useSession } from "@/app/auth/useSession"
import { ProfileLetter } from "@/components/layouts/Projects"

export interface ISignIn {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const project_code = useParams()["project_code"]
  const { logout } = useSession()
  const [formValues, setFormValues] = useState<{
    department: string
    role: string[]
  }>({ department: "", role: [] })
  const [isLoading, setIsLoading] = useState(false)
  const { departments } = useContext(UtilsContext)
  const axios = useAxios({})
  const [project, setProject] = useState<any>(null)

  const filterOption = (input: string, option: any) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const departmentOptions = useMemo(() => {
    return departments.map((department) => ({
      label: `${department.name.charAt(0).toUpperCase()}${department.name.slice(1)}`,
      value: department.id,
    }))
  }, [departments])

  const roles = useMemo(() => {
    if (formValues.department) {
      return (
        departments.find((d) => d.id === formValues.department)?.roles ?? []
      )
    } else return []
  }, [departments, formValues.department])

  const roleOptions = useMemo(() => {
    return roles.map((role) => ({
      label: `${role.name.charAt(0).toUpperCase()}${role.name.slice(1)}`,
      value: role.id,
    }))
  }, [roles])

  const getProjectFromCode = async () => {
    try {
      const { data } = await axios.get(`/projects/project-code/${project_code}`)
      setProject(data.data)
    } catch (error: any) {
      console.log(error)
      if (error?.response?.status === 401)
        logout({ redirect_path: `/join/${project_code}` })
    }
  }

  const joinProject = async () => {
    const department =
      departments.find((dept) => dept.id === formValues.department)?.name ??
      null

    const _roles =
      roles
        .filter((role) => formValues.role.includes(role.id))
        .map((r) => r.name) ?? []

    if (!department) return toast.error("Please select a department")
    if (!_roles || _roles.length < 1) return toast.error("Please select a role")

    console.log(_roles)

    setIsLoading(true)
    try {
      const { data } = await axios.post(`/projects/join/${project_code}`, {
        department,
        role: _roles,
      })
      setIsLoading(false)
      toast.success("Project joined successfully")
      router.push("/app")
    } catch (error: any) {
      console.log(error)
      toast.error(
        error?.response?.data.message ??
          error?.message ??
          "Something went wrong"
      )
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!project_code) return
    else getProjectFromCode()
  }, [project_code])

  return (
    <div className="flex min-h-screen flex-col overflow-auto">
      <div className="mb-8 p-4 md:mb-0 md:p-8">
        <Icon name="logo" />
      </div>
      <div className="flex flex-1 flex-col px-4 md:justify-center">
        <div className="mx-auto w-full lg:max-w-[360px]">
          <h1
            className={
              "mb-8 font-space_grotesk text-2xl font-bold text-rp-grey-200 md:mb-3 md:text-4xl"
            }
          >
            Join Project
          </h1>
          {project && (
            <div className="mb-8 grid gap-3">
              <h3 className="flex items-center gap-2">
                <ProfileLetter
                  name={project?.name}
                  className="aspect-square h-7 w-7 text-sm"
                />
                <span className="font-semibold text-rp-grey-200">
                  {project?.name}
                </span>
              </h3>
              <h5>You have been invited to join this project</h5>
            </div>
          )}
          <form onClick={(e) => e.preventDefault()}>
            <fieldset className="mb-5 lg:mb-4">
              <Select
                showSearch
                label="Department"
                options={departmentOptions}
                filterOption={filterOption}
                onSelect={(value) =>
                  setFormValues((v) => ({ ...v, department: value, role: [] }))
                }
              />
            </fieldset>
            <fieldset className="mb-6">
              {formValues.department ? (
                roleOptions.length > 0 ? (
                  <Select
                    showSearch
                    mode="multiple"
                    label="Roles"
                    options={roleOptions}
                    filterOption={filterOption}
                    onChange={(value: string[]) =>
                      setFormValues((v) => ({ ...v, role: value }))
                    }
                  />
                ) : (
                  <TextInput
                    value={formValues.role[0] ?? ""}
                    onChange={(e) =>
                      setFormValues((v) => ({ ...v, role: [e.target.value] }))
                    }
                  />
                )
              ) : null}
            </fieldset>
            <Button
              type="submit"
              variant="primary"
              className="mb-4 w-full"
              disabled={isLoading}
              onClick={joinProject}
            >
              {isLoading ? "Joining..." : "Join"}
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden items-center justify-between p-8 md:flex">
        <a href="https://www.rollpay.app/privacy-policy" target="_blank">
          Terms
        </a>
        <div className="flex items-center gap-2">
          <Icon name="envelope" />
          <a href="mailto:info@rollpay.app">info@rollpay.app</a>
        </div>
      </div>
    </div>
  )
}
