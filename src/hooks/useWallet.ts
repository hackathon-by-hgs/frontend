// useWallet.ts - Wallet operations hook
import { useCallback } from 'react'
import { useContext } from 'react'
import { WalletContext } from '@/contexts'
import type { WalletContext as WalletContextType } from '@/contexts'

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}
