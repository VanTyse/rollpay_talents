import { toast } from "sonner"

export default function errorToast(
  error: any,
  fallback_message: string = "Something went wrong"
) {
  toast.error(
    error?.response?.data?.message ??
      error?.data?.message ??
      error?.message ??
      fallback_message
  )
}
