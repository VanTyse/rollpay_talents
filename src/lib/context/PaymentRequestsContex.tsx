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
import { ProjectContext } from "./ProjectContext"
import { Payment as PaymentRequest } from "../types"

type ContextType = {
  paymentRequests: PaymentRequest[]
  refresh?: () => void
}

export const PaymentRequestContext = createContext<ContextType>({
  paymentRequests: [],
})

export const PaymentRequestContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const axios = useAxios({})
  const [refreshCount, setRefreshCount] = useState(0)

  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([])
  const { selectedProject } = useContext(ProjectContext)

  const fetchPaymentRequests = useCallback(async () => {
    try {
      const { data } = await axios(
        `/projects/${selectedProject?.id}/payment-requests`
      )
      return data.data as PaymentRequest[]
    } catch (error) {
      console.log(error)
    }
  }, [selectedProject])

  useEffect(() => {
    if (!selectedProject) return
    fetchPaymentRequests().then((paymentRequests) => {
      if (!paymentRequests) return
      setPaymentRequests(paymentRequests)
    })
  }, [selectedProject, refreshCount])

  const refresh = () => setRefreshCount((c) => c + 1)

  return (
    <PaymentRequestContext.Provider
      value={{
        paymentRequests,
        refresh,
      }}
    >
      {children}
    </PaymentRequestContext.Provider>
  )
}
