import { type Socket, Manager } from 'socket.io-client'

let whatsappSocketInstance: Socket | null = null

export function getWhatsappSocket(): Socket {
  if (!whatsappSocketInstance) {
    const manager = new Manager(process.env.NEXT_PUBLIC_API_URL ?? '', {
      transports: ['websocket'],
      autoConnect: false,
      timeout: 20000,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })
    whatsappSocketInstance = manager.socket('/ws/whatsapp')
  }
  return whatsappSocketInstance
}
