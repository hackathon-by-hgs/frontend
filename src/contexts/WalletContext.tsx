// src/contexts/WalletContext.tsx - Wallet State Context
import React, { createContext, useState, useCallback } from 'react'
import { Wallet, Transfer } from '@/types'
import { localStorage } from '@/services/storage'

interface WalletContextType {
  wallet: Wallet | null
  balance: number | null
  transfers: Transfer[]
  addTransfer: (transfer: Transfer) => void
  updateBalance: (amount: number) => void
  fetchBalance: () => Promise<void>
  fetchHistory: () => Promise<void>
  loadWallet: () => Promise<void>
  loading: boolean
  error: string | null
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBalance = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Call wallet API
      // const data = await api.get('/wallet/balance')
      // setWallet(data)
      // await localStorage.setWalletData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load balance')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Call transaction history API
      // const data = await api.get('/wallet/history')
      // setTransfers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadWallet = useCallback(async () => {
    setLoading(true)
    try {
      // TODO: Call wallet API
      // const data = await api.get('/wallet/balance')
      // setWallet(data)
      // await localStorage.setWalletData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load wallet')
    } finally {
      setLoading(false)
    }
  }, [])

  const addTransfer = useCallback((transfer: Transfer) => {
    setTransfers((prev) => [transfer, ...prev])
  }, [])

  const updateBalance = useCallback((amount: number) => {
    setWallet((prev) => {
      if (!prev) return null
      return { ...prev, balance: prev.balance + amount }
    })
  }, [])

  return (
    <WalletContext.Provider
      value={{
        wallet,
        balance: wallet?.balance || null,
        transfers,
        addTransfer,
        updateBalance,
        fetchBalance,
        fetchHistory,
        loadWallet,
        loading,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export type { WalletContextType }
