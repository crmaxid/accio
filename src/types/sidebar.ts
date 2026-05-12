import type { IconSvgElement } from '@hugeicons/react'

export type Team = {
  id: string
  name: string
  plan: string
  logo: string
  navItems: NavItem[]
}

export type NavItem = {
  title: string
  url: string
  icon?: IconSvgElement
  isActive?: boolean
  items?: { title: string; url: string; icon?: IconSvgElement }[]
}

export type NavUser = {
  name: string
  email: string
  avatar?: string
}
