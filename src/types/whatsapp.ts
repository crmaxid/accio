export type WhatsappStatus =
  | 'STOPPED'
  | 'WORKING'
  | 'STARTING'
  | 'SCAN_QR_CODE'
  | 'FAILED'

export interface WhatsappSession {
  id: string
  phoneNumber: string | null
  wahaSessionId: string
  wahaMe: {
    id: string
    pushName: string
  } | null
  status: WhatsappStatus | null
  createdAt: string
  updatedAt: string
}

export interface WhatsappQrCode {
  success: boolean
  sessionId: string
  qrCode: {
    mimeType: string
    data: string
  }
}
