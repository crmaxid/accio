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
import { TeamSwitcher } from './team-switcher'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { useUserStore } from '@/stores'

export function AppSidebar() {
  const pathname = usePathname()
  const teamId = pathname.split('/')[1]
  const user = useUserStore((state) => state.user)

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
        <NavUser
          user={{
            name: user?.name ?? '',
            email: user?.email ?? '',
            avatar: user?.profile?.avatarUrl,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
