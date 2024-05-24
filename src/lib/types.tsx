import type { SVGProps } from "react"

export interface IconPropTypes extends SVGProps<SVGSVGElement> {
  color?: string
  width?: number
  height?: number
}

export interface TextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  error?: { message: string } | null
  label?: string
  cols?: number
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
  error?: { message: string } | null
  label?: React.ReactElement | string
}

export interface Project {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  status: "active" | "inactive" | "completed"
  createdAt: string
  updatedAt: string
  role: string
  talentId: string
  userId: string
  companyId: string
}

export interface ProjectWithBalance extends Project {
  earned_amount: number
  remaining_balance: number
}
export interface Paperwork {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  name: string
  url: string
  description: string
  status: string
  companyId: string
  type: string
  size: string | null
  paperworkId: string
  deleted_at: string | null
}

export interface Payment {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  subject: string
  categoryId: string
  talentId: string
  companyId: string
  projectId: string
  amount: string
  dueDate: string
  attachments: {
    link: string
    mime: string
  }[]
  status: "pending" | "approved" | "declined"
  description: string
  vat: null
  userId: string
  deleted_at: string | null
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  category: {
    id: string
    name: string
  }
  talent: {
    id: string
    userId: string
    departmentId: null
    role: string
    companyId: string
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
    }
  }
}

export interface Invoice {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  service: string
  clientEmail: string
  clientName: string
  clientPhone: string
  clientAddress: string
  userId: string
  invoiceNumber: string | null
  description: string
  amount: string
  paymentRefrence: string
  dueDate: string
  status: string
  paidAt: string
  notes: string
  currency: string
  link: string | null
  deleted_at: string | null
}

export interface FAQ {
  question: string
  answer: string | React.ReactNode
}
