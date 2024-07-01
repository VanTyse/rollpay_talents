"use client"

import PageLoader from "@/components/general/PageLoader"
import { useSession } from "./auth/useSession"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()

  const { session } = useSession()
  useEffect(() => {
    if (session && session.access) {
      router.push("/app")
    }
  }, [session])
  return <PageLoader />
}
