import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rollpay | Talents Sign Up",
  description: "Rollpay application, talents dashboard.",
}

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
