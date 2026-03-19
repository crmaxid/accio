'use client'

import { usePathname } from 'next/navigation'
import { Home01Icon } from '@hugeicons/core-free-icons'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { TEAMS_CONFIG } from '@/lib/config/teams.config'
import type { NavUser as NavUserType } from '@/types'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

const USER: NavUserType = {
  name: 'John Doe',
  email: 'john@acme.com',
}

export function AppSidebar() {
  const pathname = usePathname()
  const teamId = pathname.split('/')[1]

  const activeTeam =
    TEAMS_CONFIG.find((t) => t.id === teamId) ?? TEAMS_CONFIG[0]

  const navItems = [
    {
      title: 'Dashboard',
      url: `/${activeTeam.id}`,
      icon: Home01Icon,
      isActive: pathname === `/${activeTeam.id}`,
    },
    ...activeTeam.navItems.map((item) => ({
      ...item,
      url: `/${activeTeam.id}${item.url ? `/${item.url}` : ''}`,
      items: item.items?.map((sub) => ({
        ...sub,
        url: `/${activeTeam.id}/${sub.url}`,
      })),
    })),
  ]

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <TeamSwitcher teams={TEAMS_CONFIG} activeTeam={activeTeam} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={USER} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
