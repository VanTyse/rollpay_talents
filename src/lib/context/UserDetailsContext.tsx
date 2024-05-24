"use client"
import { createContext, useEffect, useState } from "react"
import useAxios from "../hooks/useAxios"
import { useSession } from "@/app/auth/useSession"

type ContextType = {
  userAccount: UserAccount | null
  forceRefresh?: () => void
}

export const UserDetailsContext = createContext<ContextType>({
  userAccount: null,
})

interface UserAccount {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  userId: string
  accountNumber: string
  bankName: string
  accountName: string
  accountType: string
  routingNumber: string
  swiftCode: string
  iban: string
  taxId: string
  deleted_at: string | null
}

export const UserDetailsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null)
  const [refreshCount, setRefreshCount] = useState(0)
  const { session } = useSession()

  const axios = useAxios({})

  const fetchUserAccount = async () => {
    try {
      const { data } = await axios(`/user/user-account`)
      return data.data as UserAccount
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserAccount().then((userAccount) => {
      if (!userAccount) return
      setUserAccount(userAccount)
    })
  }, [refreshCount, session])

  const forceRefresh = () => setRefreshCount((x) => x + 1)

  return (
    <UserDetailsContext.Provider
      value={{
        userAccount,
        forceRefresh,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  )
}
