import { AppSidebar } from '@/components/sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#E8ECF2]">
      <AppSidebar />
      <SidebarInset className="my-2 mr-2 overflow-hidden rounded-xl shadow-sm ring-1 ring-slate-200/60">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-slate-100 px-5">
          <SidebarTrigger className="-ml-1 text-slate-400 hover:text-slate-600" />
          <Separator orientation="vertical" className="h-4 bg-slate-200" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
