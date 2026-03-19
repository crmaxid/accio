'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpDownIcon, Tick01Icon } from '@hugeicons/core-free-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import type { Team } from '@/types'

type TeamSwitcherProps = {
  teams: Team[]
  activeTeam: Team
}

function TeamLogo({
  logo,
  name,
  size,
}: {
  logo: string
  name: string
  size: number
}) {
  return (
    <Image
      src={logo}
      alt={name}
      width={size}
      height={size}
      className="size-full object-cover"
      loading="eager"
    />
  )
}

export function TeamSwitcher({ teams, activeTeam }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  const router = useRouter()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-12 gap-3 rounded-xl px-3 hover:bg-slate-50 data-[state=open]:bg-slate-50"
            >
              <div className="flex size-8 shrink-0 overflow-hidden rounded-lg shadow-sm">
                <TeamLogo
                  logo={activeTeam.logo}
                  name={activeTeam.name}
                  size={32}
                />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-[13px] font-semibold text-slate-800">
                  {activeTeam.name}
                </span>
                <span className="truncate text-[11px] text-slate-500">
                  {activeTeam.plan}
                </span>
              </div>
              <HugeiconsIcon
                icon={ArrowUpDownIcon}
                className="size-3.5 shrink-0 text-slate-500"
                strokeWidth={2}
                color="currentColor"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl p-1.5 shadow-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={6}
          >
            <DropdownMenuLabel className="px-2 py-1 text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
              Teams
            </DropdownMenuLabel>
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => router.push(`/${team.id}`)}
                className="gap-2.5 rounded-lg px-2 py-2"
              >
                <div className="size-7 shrink-0 overflow-hidden rounded-md">
                  <TeamLogo logo={team.logo} name={team.name} size={28} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium">{team.name}</p>
                  <p className="text-[11px] text-slate-500">{team.plan}</p>
                </div>
                {activeTeam.id === team.id && (
                  <HugeiconsIcon
                    icon={Tick01Icon}
                    className="size-4 text-orange-600"
                    strokeWidth={2.5}
                    color="currentColor"
                  />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="gap-2.5 rounded-lg px-2 py-2 text-slate-500">
              <div className="flex size-7 items-center justify-center rounded-md border border-dashed border-slate-300">
                <span className="text-sm leading-none text-slate-500">+</span>
              </div>
              <span className="text-[13px]">Add team</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
