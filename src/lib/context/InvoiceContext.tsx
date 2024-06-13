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
import { Invoice } from "../types"
import { ProjectContext } from "./ProjectContext"
import { AuthContext } from "./AuthContext"
import { useSession } from "@/app/auth/useSession"

type ContextType = {
  invoices: Invoice[]
  query: string
  setQuery?: React.Dispatch<React.SetStateAction<string>>
  forceRefresh?: () => void
}

export const InvoiceContext = createContext<ContextType>({
  invoices: [],
  query: "",
})

export const InvoiceContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { session } = useSession()
  const axios = useAxios({})
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [query, setQuery] = useState("")
  const [refreshCount, setRefreshCount] = useState(0)

  const abortController = useMemo(() => new AbortController(), [])
  const signal = useMemo(() => abortController.signal, [abortController])

  const { selectedProject } = useContext(ProjectContext)

  const fetchInvoices = useCallback(async () => {
    if (!selectedProject) return
    try {
      const { data } = await axios(`/invoices`, {
        signal,
      })
      return data.data.data as Invoice[]
    } catch (error) {
      console.log(error)
    }
  }, [selectedProject])

  useEffect(() => {
    fetchInvoices().then((invoices) => {
      if (!invoices) return
      setInvoices(invoices.reverse())
    })
  }, [selectedProject, session, refreshCount])

  const validInvoices = useMemo(
    () => invoices.filter((i) => !!i.invoiceNumber),
    [invoices]
  )

  const searchedInvoices = useMemo(() => {
    if (!query) return validInvoices
    return validInvoices.filter(
      (i) =>
        i.invoiceNumber?.includes(query) ||
        i.clientName?.includes(query) ||
        i.clientEmail?.includes(query) ||
        i.clientPhone?.includes(query) ||
        i.amount?.includes(query)
    )
  }, [query, validInvoices])

  const forceRefresh = () => setRefreshCount((x) => x + 1)

  return (
    <InvoiceContext.Provider
      value={{
        invoices: searchedInvoices,
        query,
        setQuery,
        forceRefresh,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}
