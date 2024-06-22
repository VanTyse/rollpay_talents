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
  id: 302
  name: "9mobile 9Payment Service Bank"
  slug: "9mobile-9payment-service-bank-ng"
  code: "120001"
  longcode: "120001"
  gateway: ""
  pay_with_bank: false
  supports_transfer: true
  active: true
  country: "Nigeria"
  currency: "NGN"
  type: "nuban"
  is_deleted: false
  createdAt: "2022-05-31T06:50:27.000Z"
  updatedAt: "2022-06-23T09:33:55.000Z"
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

  const fetchBanks = async () => {
    try {
      const { data } = await axios(`/utilities/banks`)
      return data.data as Bank[]
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDepartments = async () => {
    try {
      const { data } = await axios(`/utilities/departments`)
      return data.data as Department[]
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
        console.log(error)
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
