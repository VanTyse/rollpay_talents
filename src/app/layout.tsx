import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"
import theme from "./antd_theme"
import { Toaster } from "sonner"
import Providers from "./providers"
import Head from "next/head"
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Rollpay | Talents",
  description: "Rollpay application, talents dashboard.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/rollpay.png"></link>
      </Head>
      <body
        className={`${inter.className}
          ${space_grotesk.variable}
          text-rp-grey-100
        `}
      >
        <Providers>
          <Toaster richColors position="top-right" />
          <AntdRegistry>
            <ConfigProvider theme={theme}>{children}</ConfigProvider>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  )
}
