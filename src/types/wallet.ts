// Type definitions for wallet and transfers
export interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  updatedAt: Date
}

export interface Transfer {
  id: string
  senderId: string
  senderName?: string
  receiverId: string
  receiverName?: string
  recipientName?: string  // Alias for receiverName
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  type?: 'sent' | 'received'  // For display purposes
  timestamp: Date
  date?: Date  // Alias for timestamp
  nfcToken?: string
  aiNotes?: string
}

export interface NFCPayload {
  senderId: string
  amount: number
  token: string
  timestamp: number
  nonce: string
}
