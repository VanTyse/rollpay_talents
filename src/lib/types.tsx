import type { SVGProps } from "react"

export interface IconPropTypes extends SVGProps<SVGSVGElement> {
  color?: string
  width?: number
  height?: number
}

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  error?: { message: string } | null
  label?: string
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: { message: string } | null
  label?: React.ReactElement | string
}

export interface Project {
  project_id: string
  project_name: string
}

export interface Paperwork {
  title: string
  created_at: string
  updated_at: string
  last_opened: string
  file_url: string
}

export interface Payment {
  amount: number
  status: "pending" | "success" | "failed"
  category:
    | "accomodation"
    | "transportation"
    | "logistics"
    | "salary"
    | "legal"
    | "production"
  created_at: string
  invoice: Paperwork
}
