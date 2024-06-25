"use client"

import FadeImagesLoop from "@/components/general/FadeImagesInLoop"
import PageLoader from "@/components/general/PageLoader"
import { Suspense } from "react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={<PageLoader />}>
      <main className="grid grid-cols-1 lg:grid-cols-2">
        {children}

        <div className="hidden items-center justify-center bg-rp-blue lg:flex">
          <FadeImagesLoop
            images={[
              "/images/auth_image_1.png",
              "/images/auth_image_2.png",
              "/images/auth_image_3.png",
              "/images/auth_image_4.png",
              "/images/auth_image_5.png",
              "/images/auth_image_6.png",
            ]}
            fade={false}
            intervalDuration={1500}
          />
        </div>
      </main>
    </Suspense>
  )
}
