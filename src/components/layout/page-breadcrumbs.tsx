'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.slice(1) // skip teamId

  return crumbs.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 2).join('/')
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    const isLast = index === crumbs.length - 1
    return { label, href, isLast }
  })
}

export function PageBreadcrumbs() {
  const pathname = usePathname()
  const breadcrumbs = buildBreadcrumbs(pathname)

  if (breadcrumbs.length === 0) return null

  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {breadcrumbs.map((crumb) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!crumb.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
