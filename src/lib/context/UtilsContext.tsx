"use client"

import { createContext, useEffect, useRef, useState } from "react"
import useAxios from "../hooks/useAxios"
import { FAQ } from "../types"
import { faqs as questions } from "../mockData"

type ContextType = {
  countries: Countries[]
  expenseCategories: ExpenseCategory[]
  faqs: FAQ[]
  banks: Bank[]
  departments: Department[]
  downloadFile?: (data: {
    fileName?: string
    link?: string | null
    download: boolean
    mode: "link" | "name"
    callBack?: (err: any, data: string | null) => void
  }) => void
}

export const UtilsContext = createContext<ContextType>({
  countries: [],
  expenseCategories: [],
  faqs: [],
  banks: [],
  departments: [],
})

interface ExpenseCategory {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  name: string
  description: null
  deleted_at: null
}

interface Role {
  id: string
  name: string
  description: null
  slug: null
}

interface Department {
  id: string
  name: string
  description: string
  slug: string
  roles: Role[]
}

interface Countries {
  id: number
  iso: string
  name: string
  nicename: string
  iso3: string
  numcode: number
  phonecode: number
}

interface Bank {
  id: number
  name: string
  slug: string
  code: string
  longcode: string
  gateway: string
  pay_with_bank: boolean
  supports_transfer: boolean
  active: boolean
  country: string
  currency: string
  type: string
  is_deleted: boolean
  createdAt: string
  updatedAt: string
}

export const UtilsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [countries, setCountries] = useState<Countries[]>([])
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  )
  const [faqs, setFaqs] = useState<FAQ[]>(questions)
  const [banks, setBanks] = useState<Bank[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const anchorRef = useRef<HTMLAnchorElement>(null)

  const axios = useAxios({})

  const fetchCountries = async () => {
    try {
      const { data } = await axios(`/utilities/countries`)
      return data.data as Countries[]
    } catch (error) {}
  }

  const fetchExpenseCategories = async () => {
    try {
      const { data } = await axios(`/utilities/expense-category`)
      return data.data as ExpenseCategory[]
    } catch (error) {}
  }

  const fetchBanks = async () => {
    try {
      const { data } = await axios(`/utilities/banks`)
      return data.data as Bank[]
    } catch (error) {}
  }

  const fetchDepartments = async () => {
    try {
      const { data } = await axios(`/utilities/departments`)
      return data.data as Department[]
    } catch (error) {}
  }

  useEffect(() => {
    fetchCountries().then((countries) => {
      if (!countries) return
      setCountries(countries)
    })
  }, [])

  useEffect(() => {
    fetchExpenseCategories().then((expenseCategories) => {
      if (!expenseCategories) return
      setExpenseCategories(expenseCategories)
    })
  }, [])

  useEffect(() => {
    fetchBanks().then((banks) => {
      if (!banks) return
      setBanks(banks)
    })
  }, [])

  useEffect(() => {
    fetchDepartments().then((depts) => {
      if (!depts) return
      setDepartments(depts)
    })
  }, [])

  const downloadFile = async ({
    fileName,
    link,
    mode = "name",
    callback,
    download,
  }: {
    fileName?: string
    link?: string | null
    download: boolean
    mode: "link" | "name"
    callback?: (err: any, data: string | null) => void
  }) => {
    if (mode === "link" && link) {
      if (download) {
        anchorRef.current!.href = link
        anchorRef.current?.click()
      }
    } else if (mode === "name" && fileName) {
      try {
        const { data } = await axios(
          `/utilities/file-upload?fileName=${fileName}`
        )
        if (download) {
          anchorRef.current!.href = data.data
          anchorRef.current?.click()
        }

        callback && callback(null, data.data)
      } catch (error) {
        callback && callback(error, null)
      }
    }
  }

  return (
    <UtilsContext.Provider
      value={{
        countries,
        expenseCategories,
        faqs,
        banks,
        departments,
        downloadFile,
      }}
    >
      <a ref={anchorRef} download className="hidden" target="_blank"></a>
      {children}
    </UtilsContext.Provider>
  )
}
