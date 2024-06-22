"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import useAxios from "../hooks/useAxios"
import { AuthContext } from "./AuthContext"
import { Project } from "../types"

interface Company {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  name: string
  email: string
  phone: string
  numberOfEmployees: null
  address: string
  city: string
  website: string
  logo: string
  state: string
  countryId: 1
  ownerId: string
  deleted_at: string | null
  country: {
    id: number
    iso: string
    name: string
    nicename: string
    iso3: string
    numcode: number
    phonecode: number
  }
}

type ContextType = {
  projects: Project[]
  selectedProject: Project | null
  updateSelectedProject?: (project: Project) => void
  company: Company | null
}

export const ProjectContext = createContext<ContextType>({
  projects: [],
  selectedProject: null,
  company: null,
})

export const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { accessToken } = useContext(AuthContext)
  const axios = useAxios({})
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [company, setCompany] = useState<Company | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await axios("/user/projects")
      return data.data as Project[]
    } catch (error) {
      console.log(error)
    }
  }, [accessToken])

  const fetchCompany = useCallback(async () => {
    try {
      const { data } = await axios(`/companies/${selectedProject?.companyId}`)
      return data.data as Company
    } catch (error) {
      console.log(error)
    }
  }, [selectedProject])

  useEffect(() => {
    fetchProjects().then((projects) => {
      if (!projects) {
        setSelectedProject(null)
        setProjects([])
        return
      }
      setProjects(projects)
      setSelectedProject(projects[0])
    })
  }, [accessToken])

  useEffect(() => {
    if (!selectedProject) return
    fetchCompany().then((company) => {
      if (!company) return
      setCompany(company)
    })
  }, [selectedProject])

  const updateSelectedProject = (project: Project) =>
    setSelectedProject(project)

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        updateSelectedProject,
        company,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
