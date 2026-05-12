import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { UserProvider } from '@/components/providers/user-provider'
import { AppHeader, PageBreadcrumbs } from '@/components/layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <SidebarProvider className="bg-[#E8ECF2]">
        <AppSidebar />
        <SidebarInset className="my-2 mr-2 overflow-hidden rounded-xl shadow-sm ring-1 ring-slate-200/60">
          <AppHeader />
          <main className="flex flex-1 flex-col gap-4 p-6">
            <PageBreadcrumbs />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  )
}
