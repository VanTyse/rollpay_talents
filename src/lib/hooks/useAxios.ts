import axios, { AxiosHeaders } from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

type AxiosRequestHeaders = Record<string, string | number | boolean>

const useAxios = ({
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL,
  headers,
}: {
  baseURL?: string
  headers?: AxiosRequestHeaders
}) => {
  const { accessToken, refreshToken } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL,
    timeout: 20000,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
  })

  return axiosInstance
}

export default useAxios
