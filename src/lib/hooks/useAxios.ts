"use client"

import axios, { AxiosHeaders } from "axios"
import { useContext, useMemo } from "react"
import { AuthContext } from "../context/AuthContext"

type AxiosRequestHeaders = Record<string, string | number | boolean>

const useAxios = ({
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL,
  headers,
}: {
  baseURL?: string
  headers?: AxiosRequestHeaders
}) => {
  const { accessToken } = useContext(AuthContext)

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL,
        timeout: 20000,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...headers,
        },
      }),
    [accessToken]
  )

  return axiosInstance
}

export default useAxios
