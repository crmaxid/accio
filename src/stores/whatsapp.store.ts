import { create } from 'zustand'
import { getWhatsappSocket } from '@/lib/socket'
import type { WhatsappSession, WhatsappQrCode } from '@/types'

type WhatsappStore = {
  sessions: WhatsappSession[]
  isConnected: boolean
  isInitialized: boolean
  qrCode: string | null
  isStartingSession: boolean
  startSessionError: string | null
  isRefreshing: boolean

  initialize: () => void
  createSession: () => void
  restartSession: (sessionId: string) => void
  requestQrCode: (sessionId: string) => void
  refresh: () => void
}

export const useWhatsappStore = create<WhatsappStore>((set, get) => ({
  sessions: [],
  isConnected: false,
  isInitialized: false,
  qrCode: null,
  isStartingSession: false,
  startSessionError: null,
  isRefreshing: false,

  initialize: () => {
    if (get().isInitialized) return

    const socket = getWhatsappSocket()

    socket.on('connect', () => {
      set({ isConnected: true })
      socket.emit('get-session-status')
    })

    socket.on('disconnect', () => set({ isConnected: false }))

    socket.on('session-status', (sessions: WhatsappSession[]) => {
      set({ sessions })
    })

    socket.on('qr-code', (data: WhatsappQrCode) => {
      set({
        qrCode: `data:${data.qrCode.mimeType};base64,${data.qrCode.data}`,
      })
    })

    socket.on(
      'start-session-status',
      ({ inProgress }: { inProgress: boolean }) => {
        set({ isStartingSession: inProgress })
        if (!inProgress) socket.emit('get-session-status')
      },
    )

    socket.on(
      'start-session-error',
      ({ error }: { success: boolean; error: string | null }) => {
        set({ isStartingSession: false, startSessionError: error })
      },
    )

    socket.on(
      'refresh-session-status',
      ({ inProgress }: { inProgress: boolean }) => {
        set({ isRefreshing: inProgress })
        if (!inProgress) socket.emit('get-session-status')
      },
    )

    socket.connect()
    set({ isInitialized: true })
  },

  createSession: () => {
    const socket = getWhatsappSocket()
    set({ isStartingSession: true, startSessionError: null })
    socket.emit('start-session')
  },

  restartSession: (sessionId: string) => {
    const socket = getWhatsappSocket()
    socket.emit('restart-session', { sessionId })
  },

  requestQrCode: (sessionId: string) => {
    const socket = getWhatsappSocket()
    set({ qrCode: null })
    socket.emit('get-qr-code', { sessionId })
  },

  refresh: () => {
    const socket = getWhatsappSocket()
    set({ isRefreshing: true })
    socket.emit('refresh-session')
  },
}))
