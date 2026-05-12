'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  WhatsappIcon,
  Loading03Icon,
  RefreshIcon,
  ArrowReloadHorizontalIcon,
  Cancel01Icon,
  SmartPhone01Icon,
} from '@hugeicons/core-free-icons'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useWhatsappStore } from '@/stores'
import type { WhatsappSession } from '@/types'

function formatPhone(phone: string | null): string {
  if (!phone) return '—'
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 8) return phone
  return `+${digits.slice(0, 2)} ${digits.slice(2, 6)}-${digits.slice(6)}`
}

function StatusDot({ status }: { status: string | null }) {
  const color =
    status === 'WORKING'
      ? 'bg-emerald-500'
      : status === 'SCAN_QR_CODE' || status === 'STARTING'
        ? 'bg-amber-400'
        : status === 'FAILED' || status === 'STOPPED'
          ? 'bg-red-500'
          : 'bg-gray-300'
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${color} ${status === 'STARTING' ? 'animate-pulse' : ''}`}
    />
  )
}

function EmptyState({
  onCreate,
  isStarting,
  error,
}: {
  onCreate: () => void
  isStarting: boolean
  error: string | null
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10">
        <HugeiconsIcon
          icon={SmartPhone01Icon}
          size={22}
          strokeWidth={1.5}
          className="text-[#25D366]"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">No active session</p>
        <p className="mt-0.5 text-[11px] text-gray-400">
          Connect a WhatsApp account to send notifications
        </p>
      </div>
      {error && <p className="text-[11px] text-red-500">{error}</p>}
      <Button
        size="sm"
        className="w-full bg-[#25D366] text-white hover:bg-[#20bc5a]"
        onClick={onCreate}
        disabled={isStarting}
      >
        {isStarting ? (
          <HugeiconsIcon
            icon={Loading03Icon}
            strokeWidth={2}
            className="animate-spin"
          />
        ) : (
          <HugeiconsIcon icon={WhatsappIcon} size={13} strokeWidth={2} />
        )}
        {isStarting ? 'Connecting...' : 'Connect WhatsApp'}
      </Button>
    </div>
  )
}

function StartingState() {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <HugeiconsIcon
        icon={Loading03Icon}
        size={28}
        strokeWidth={1.5}
        className="animate-spin text-[#25D366]"
      />
      <div>
        <p className="text-sm font-medium text-gray-800">Starting session</p>
        <p className="mt-0.5 text-[11px] text-gray-400">
          This may take a few seconds…
        </p>
      </div>
    </div>
  )
}

function QrState({
  qrCode,
  onRefresh,
}: {
  qrCode: string | null
  onRefresh: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-700">Scan QR Code</p>
          <p className="text-[11px] text-gray-400">
            Open WhatsApp → Camera → Scan
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
          onClick={onRefresh}
        >
          <HugeiconsIcon icon={RefreshIcon} size={13} strokeWidth={2} />
        </Button>
      </div>

      <div className="flex h-52 w-52 items-center justify-center rounded-xl border border-gray-100 bg-white">
        {qrCode ? (
          <Image
            src={qrCode}
            alt="WhatsApp QR Code"
            width={200}
            height={200}
            className="rounded-lg"
            unoptimized
          />
        ) : (
          <HugeiconsIcon
            icon={Loading03Icon}
            size={24}
            strokeWidth={1.5}
            className="animate-spin text-gray-300"
          />
        )}
      </div>

      <p className="text-center text-[11px] text-gray-400">
        QR code expires soon. Tap refresh if it stops working.
      </p>
    </div>
  )
}

function WorkingState({ session }: { session: WhatsappSession }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15">
          <HugeiconsIcon
            icon={WhatsappIcon}
            size={18}
            strokeWidth={1.5}
            className="text-[#25D366]"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-gray-800">
            {session.wahaMe?.pushName ?? session.wahaSessionId}
          </p>
          <p className="text-[11px] text-gray-500">
            {formatPhone(session.phoneNumber)}
          </p>
        </div>
        <span className="inline-flex h-5 items-center rounded-full border border-emerald-200 bg-emerald-100 px-2 text-[10px] font-medium text-emerald-700">
          Connected
        </span>
      </div>
    </div>
  )
}

function FailedState({
  session,
  onRestart,
}: {
  session: WhatsappSession
  onRestart: () => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/60 px-3 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
          <HugeiconsIcon
            icon={Cancel01Icon}
            size={16}
            strokeWidth={2}
            className="text-red-500"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-gray-800">
            Connection failed
          </p>
          <p className="text-[11px] text-gray-500">{session.wahaSessionId}</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={onRestart}
      >
        <HugeiconsIcon
          icon={ArrowReloadHorizontalIcon}
          size={13}
          strokeWidth={2}
        />
        Restart Session
      </Button>
    </div>
  )
}

function SessionPanel({ session }: { session: WhatsappSession }) {
  const { qrCode, isStartingSession, requestQrCode, restartSession } =
    useWhatsappStore()

  useEffect(() => {
    if (session.status === 'SCAN_QR_CODE' && !qrCode) {
      requestQrCode(session.id)
    }
  }, [session.status, session.id, qrCode, requestQrCode])

  if (isStartingSession || session.status === 'STARTING') {
    return <StartingState />
  }

  if (session.status === 'SCAN_QR_CODE') {
    return (
      <QrState qrCode={qrCode} onRefresh={() => requestQrCode(session.id)} />
    )
  }

  if (session.status === 'WORKING') {
    return <WorkingState session={session} />
  }

  return (
    <FailedState
      session={session}
      onRestart={() => restartSession(session.id)}
    />
  )
}

export function NavWhatsapp() {
  const { isMobile } = useSidebar()
  const {
    sessions,
    isConnected,
    isStartingSession,
    startSessionError,
    isRefreshing,
    initialize,
    createSession,
    refresh,
  } = useWhatsappStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  const primarySession = sessions[0] ?? null
  const isOnline = primarySession?.status === 'WORKING'

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-10 gap-3 rounded-xl px-3 hover:bg-slate-50"
              tooltip="WhatsApp"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10">
                <HugeiconsIcon
                  icon={WhatsappIcon}
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#25D366]"
                />
                <span
                  className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${isOnline ? 'bg-emerald-500' : !isConnected ? 'bg-gray-300' : sessions.length === 0 ? 'bg-gray-300' : primarySession?.status === 'SCAN_QR_CODE' || primarySession?.status === 'STARTING' ? 'bg-amber-400' : 'bg-red-500'}`}
                />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="text-[13px] font-semibold text-slate-800">
                  WhatsApp
                </span>
                <span className="text-[11px] text-slate-500">
                  {!isConnected
                    ? 'Disconnected'
                    : isOnline
                      ? 'Connected'
                      : primarySession?.status === 'SCAN_QR_CODE'
                        ? 'Scan QR code'
                        : primarySession?.status === 'STARTING' ||
                            isStartingSession
                          ? 'Starting...'
                          : sessions.length === 0
                            ? 'No session'
                            : 'Not connected'}
                </span>
              </div>
            </SidebarMenuButton>
          </PopoverTrigger>

          <PopoverContent
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={8}
            className="w-72 rounded-2xl p-0 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={WhatsappIcon}
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#25D366]"
                />
                <span className="text-sm font-semibold text-gray-800">
                  WhatsApp
                </span>
                {isConnected && (
                  <StatusDot status={primarySession?.status ?? null} />
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
                onClick={refresh}
                disabled={isRefreshing || !isConnected}
              >
                <HugeiconsIcon
                  icon={RefreshIcon}
                  size={13}
                  strokeWidth={2}
                  className={isRefreshing ? 'animate-spin' : ''}
                />
              </Button>
            </div>

            {/* Body */}
            <div className="px-4 py-3">
              {!isConnected ? (
                <div className="py-4 text-center text-[11px] text-gray-400">
                  Connecting to server…
                </div>
              ) : sessions.length === 0 ? (
                <EmptyState
                  onCreate={createSession}
                  isStarting={isStartingSession}
                  error={startSessionError}
                />
              ) : (
                <SessionPanel session={primarySession!} />
              )}
            </div>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
