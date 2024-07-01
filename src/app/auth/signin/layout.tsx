import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rollpay | Talents Sign In",
  description: "Rollpay application, talents dashboard.",
}

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
