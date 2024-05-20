"use client"

import { createContext, useEffect, useRef, useState } from "react"
import useAxios from "../hooks/useAxios"
import { FAQ } from "../types"
import { faqs as questions } from "../mockData"

type ContextType = {
  countries: Countries[]
  expenseCategories: ExpenseCategory[]
  faqs: FAQ[]
  downloadFile?: (
    fileName: string,
    download: boolean,
    callBack?: (err: any, data: string | null) => void
  ) => void
}

export const UtilsContext = createContext<ContextType>({
  countries: [],
  expenseCategories: [],
  faqs: [],
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

interface Countries {
  id: number
  iso: string
  name: string
  nicename: string
  iso3: string
  numcode: number
  phonecode: number
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
  const anchorRef = useRef<HTMLAnchorElement>(null)

  const axios = useAxios({})

  const fetchCountries = async () => {
    try {
      const { data } = await axios(`/utilities/countries`)
      return data.data as Countries[]
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExpenseCategories = async () => {
    try {
      const { data } = await axios(`/utilities/expense-category`)
      return data.data as ExpenseCategory[]
    } catch (error) {
      console.log(error)
    }
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

  const downloadFile = async (
    fileName: string,
    download: boolean,
    callback?: (err: any, data: string | null) => void
  ) => {
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
      console.log(error)
      callback && callback(error, null)
    }
  }

  return (
    <UtilsContext.Provider
      value={{
        countries,
        expenseCategories,
        faqs,
        downloadFile,
      }}
    >
      <a ref={anchorRef} download className="hidden" target="_blank"></a>
      {children}
    </UtilsContext.Provider>
  )
}
