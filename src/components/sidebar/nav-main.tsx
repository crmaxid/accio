'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

type NavMainProps = {
  items: NavItem[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <SidebarGroup className="px-3 py-2">
      <SidebarMenu className="gap-0.5">
        {items.map((item) =>
          item.items?.length ? (
            // ── Collapsible group ──────────────────────────────────────────
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive ?? true}
              className="group/collapsible"
            >
              <SidebarMenuItem className="mt-2 first:mt-0">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      'h-9 rounded-lg px-2.5 hover:bg-slate-50',
                      isCollapsed && 'justify-center',
                    )}
                  >
                    {item.icon && (
                      <HugeiconsIcon
                        icon={item.icon}
                        className="size-[18px] shrink-0"
                        strokeWidth={2}
                        color="#475569"
                      />
                    )}
                    <span className="text-[13px] font-semibold text-slate-700 group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="ml-auto size-3 shrink-0 text-slate-400 transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-90"
                      strokeWidth={2.5}
                      color="currentColor"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-[18px] border-l border-slate-100 px-0 py-0.5">
                    {item.items.map((sub) => {
                      const isActive = pathname === sub.url
                      return (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              'h-8 rounded-md px-2.5 text-[13px] font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900',
                              isActive &&
                                'bg-orange-50 font-semibold text-orange-700 hover:bg-orange-50 hover:text-orange-700',
                            )}
                          >
                            <Link
                              href={sub.url}
                              className="flex items-center gap-2"
                            >
                              {sub.icon && (
                                <HugeiconsIcon
                                  icon={sub.icon}
                                  className="size-[15px] shrink-0"
                                  strokeWidth={isActive ? 2.5 : 2}
                                  color={isActive ? '#C2410C' : '#94A3B8'}
                                />
                              )}
                              <span>{sub.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            // ── Standalone item ────────────────────────────────────────────
            (() => {
              const isActive = pathname === item.url
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      'h-9 rounded-lg px-2.5 text-[13px] font-medium text-slate-700 transition-all hover:bg-slate-50 hover:text-slate-900',
                      isActive &&
                        'bg-orange-50 font-semibold text-orange-700 hover:bg-orange-50 hover:text-orange-700',
                    )}
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        'flex items-center gap-2.5',
                        isCollapsed && 'justify-center',
                      )}
                    >
                      {item.icon && (
                        <div
                          className={cn(
                            'flex size-6 shrink-0 items-center justify-center rounded-md',
                            isActive ? 'bg-orange-100' : 'bg-slate-100',
                          )}
                        >
                          <HugeiconsIcon
                            icon={item.icon}
                            className="size-3.5"
                            strokeWidth={isActive ? 2.5 : 2}
                            color={isActive ? '#C2410C' : '#64748B'}
                          />
                        </div>
                      )}
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })()
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
