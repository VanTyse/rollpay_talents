import { Paperwork, Payment, Project } from "./types"

export const projects: Project[] = [
  {
    project_id: "928928021",
    project_name: "Tinsel",
  },
  {
    project_id: "928928022",
    project_name: "Super Story",
  },
  {
    project_id: "928928023",
    project_name: "House of Cards",
  },
]

export const paperworks: Paperwork[] = [
  {
    title: "Rollpay Arica Policy",
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    last_opened: new Date().toDateString(),
    file_url: "",
  },
  {
    title: "Rollpay Arica Policy 1",
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    last_opened: new Date().toDateString(),
    file_url: "",
  },
  {
    title: "Rollpay Arica Policy 2",
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    last_opened: new Date().toDateString(),
    file_url: "",
  },
  {
    title: "Rollpay Arica Policy 3",
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    last_opened: new Date().toDateString(),
    file_url: "",
  },
  {
    title: "Rollpay Arica Policy 4",
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    last_opened: new Date().toDateString(),
    file_url: "",
  },
  {
    title: "Rollpay Arica Policy 5",
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    last_opened: new Date().toDateString(),
    file_url: "",
  },
  {
    title: "Rollpay Arica Policy 6",
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    last_opened: new Date().toDateString(),
    file_url: "",
  },
  {
    title: "Rollpay Arica Policy 7",
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    last_opened: new Date().toDateString(),
    file_url: "",
  },
]

export const payments: Payment[] = [
  {
    amount: 20000,
    status: "pending",
    category: "production",
    created_at: new Date().toDateString(),
    invoice: {
      title: "INV 001",
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
      last_opened: new Date().toDateString(),
      file_url: "",
    },
  },
  {
    amount: 230000,
    status: "pending",
    category: "legal",
    created_at: new Date().toDateString(),
    invoice: {
      title: "INV 002",
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
      last_opened: new Date().toDateString(),
      file_url: "",
    },
  },
  {
    amount: 180000,
    status: "success",
    category: "accomodation",
    created_at: new Date().toDateString(),
    invoice: {
      title: "INV 003",
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
      last_opened: new Date().toDateString(),
      file_url: "",
    },
  },
  {
    amount: 40000,
    status: "failed",
    category: "salary",
    created_at: new Date().toDateString(),
    invoice: {
      title: "INV 004",
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
      last_opened: new Date().toDateString(),
      file_url: "",
    },
  },
]
