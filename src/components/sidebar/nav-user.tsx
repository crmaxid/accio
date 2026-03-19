'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  AccountSetting01Icon,
  ArrowUpDownIcon,
  Logout01Icon,
  Notification01Icon,
} from '@hugeicons/core-free-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import type { NavUser } from '@/types'

type NavUserProps = {
  user: NavUser
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-12 gap-3 rounded-xl px-3 hover:bg-slate-50 data-[state=open]:bg-slate-50"
            >
              <Avatar className="size-8 rounded-lg">
                {user.avatar && (
                  <AvatarImage src={user.avatar} alt={user.name} />
                )}
                <AvatarFallback className="rounded-lg bg-[#EA580C] text-[11px] font-bold text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-[13px] font-semibold text-slate-800">
                  {user.name}
                </span>
                <span className="truncate text-[11px] text-slate-500">
                  {user.email}
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
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={6}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="size-9 rounded-lg">
                  {user.avatar && (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  )}
                  <AvatarFallback className="rounded-lg bg-[#EA580C] text-[11px] font-bold text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 leading-tight">
                  <span className="truncate text-[13px] font-semibold">
                    {user.name}
                  </span>
                  <span className="truncate text-[11px] text-slate-500">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuGroup className="space-y-px">
              <DropdownMenuItem className="gap-2.5 rounded-lg px-2 py-2 text-[13px]">
                <HugeiconsIcon
                  icon={AccountSetting01Icon}
                  className="size-4 text-slate-500"
                  strokeWidth={2}
                  color="currentColor"
                />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5 rounded-lg px-2 py-2 text-[13px]">
                <HugeiconsIcon
                  icon={Notification01Icon}
                  className="size-4 text-slate-500"
                  strokeWidth={2}
                  color="currentColor"
                />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="gap-2.5 rounded-lg px-2 py-2 text-[13px] text-red-500 focus:text-red-500">
              <HugeiconsIcon
                icon={Logout01Icon}
                className="size-4"
                strokeWidth={2}
                color="currentColor"
              />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
