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
  const axios = useAxios({})
  const [paperworks, setPaperworks] = useState<Paperwork[]>([])
  const [query, setQuery] = useState("")

  const abortController = useMemo(() => new AbortController(), [])
  const signal = useMemo(() => abortController.signal, [abortController])

  const { selectedProject } = useContext(ProjectContext)

  const fetchPaperworks = useCallback(async () => {
    try {
      const { data } = await axios(
        `/paperwork?projectId=${selectedProject?.id}${query && `&search=${query}`}`,
        { signal }
      )
      return data.data as Paperwork[]
    } catch (error) {
      console.log(error)
    }
  }, [selectedProject, query])

  useEffect(() => {
    fetchPaperworks().then((paperworks) => {
      if (!paperworks) return
      setPaperworks(paperworks)
    })
  }, [selectedProject, query])

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
