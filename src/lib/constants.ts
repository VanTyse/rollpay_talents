import { IconType } from "@/components/Icons/Icons"
import { NavItem } from "./types"
interface SettingsNavItem {
  name: string
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

export const settings_nav_items: SettingsNavItem[] = [
  {
    name: "profile",
    href: "/app/settings/profile",
  },
  {
    name: "overview",
    href: "/app/settings/overview",
  },
  {
    name: "invoice details",
    href: "/app/settings/invoice-meta",
  },
  {
    name: "payment",
    href: "/app/settings/payment",
  },
  // {
  //   name: "notifications",
  //   href: "/app/settings/notifications",
  // },
  {
    name: "help",
    href: "/app/settings/help",
  },
  {
    name: "change password",
    href: "/app/settings/change-password",
  },
]

export const CUSTOM_EVENTS = {
  UPDATE_SESSION: "UPDATE_SESSION",
  LOGOUT: "LOGOUT",
} as const

export const ITEMS_PER_PAGE = 10
