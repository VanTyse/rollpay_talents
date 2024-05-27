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
import { AuthContext } from "./AuthContext"
import { ProjectContext } from "./ProjectContext"
import { Payment as PaymentRequest } from "../types"

type ContextType = {
  paymentRequests: PaymentRequest[]
  earned_amount: number
  remaining_balance: number
  refresh?: () => void
}

export const PaymentRequestContext = createContext<ContextType>({
  paymentRequests: [],
  earned_amount: 0,
  remaining_balance: 0,
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
        `/payment-requests?talentId=${selectedProject?.talentId}`
      )
      return data.data as PaymentRequest[]
    } catch (error) {
      console.log(error)
    }
  }, [selectedProject])

  const earned_amount = useMemo(() => {
    return paymentRequests.reduce(
      (acc, curr) => (curr.status === "approved" ? +curr.amount + acc : acc),
      0
    )
  }, [])

  const remaining_balance = useMemo(() => {
    return paymentRequests.reduce(
      (acc, curr) => (curr.status === "pending" ? +curr.amount + acc : acc),
      0
    )
  }, [])

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
        earned_amount,
        remaining_balance,
        refresh,
      }}
    >
      {children}
    </PaymentRequestContext.Provider>
  )
}
