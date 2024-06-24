"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import useAxios from "../hooks/useAxios"
import { Paperwork } from "../types"
import { ProjectContext } from "./ProjectContext"
import { AuthContext } from "./AuthContext"

type ContextType = {
  paperworks: Paperwork[]
  query: string
  setQuery?: React.Dispatch<React.SetStateAction<string>>
}

export const PaperworkContext = createContext<ContextType>({
  paperworks: [],
  query: "",
})

export const PaperworkContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { accessToken } = useContext(AuthContext)

  const axios = useAxios({})
  const [paperworks, setPaperworks] = useState<Paperwork[]>([])
  const [query, setQuery] = useState("")

  const abortController = useMemo(() => new AbortController(), [])
  const signal = useMemo(() => abortController.signal, [abortController])

  const { selectedProject } = useContext(ProjectContext)

  const fetchPaperworks = useCallback(async () => {
    if (!selectedProject) return
    try {
      const { data } = await axios(
        `/paperwork?projectId=${selectedProject.id}${query && `&search=${query}`}`,
        { signal }
      )
      return data.data.data as Paperwork[]
    } catch (error) {}
  }, [selectedProject, query])

  useEffect(() => {
    fetchPaperworks().then((paperworks) => {
      if (!paperworks) {
        setPaperworks([])
        return
      }
      setPaperworks(paperworks.reverse())
    })
  }, [selectedProject, query, accessToken])

  return (
    <PaperworkContext.Provider
      value={{
        paperworks,
        query,
        setQuery,
      }}
    >
      {children}
    </PaperworkContext.Provider>
  )
}
