import { IconType } from "@/components/Icons/Icons"
type NavItem = {
  name: string
  icon_name: IconType
  href: string
}

export const nav_items: NavItem[] = [
  {
    name: "home",
    icon_name: "home",
    href: "/app",
  },
  {
    name: "payments",
    icon_name: "coins",
    href: "/app/payments",
  },
  {
    name: "paperwork",
    icon_name: "paperwork",
    href: "/app/paperwork",
  },
  {
    name: "settings",
    icon_name: "settings",
    href: "/app/settings",
  },
]
