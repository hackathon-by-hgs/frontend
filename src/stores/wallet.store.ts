import { secureStorage } from "@/services";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secureStoreAdapter } from "./auth.store";


export type Currency = "NGN" | "USD";

export interface IWallet {
  id: string;
  balance: string;
  createdAt: string;
  updatedAt: string;
  currency: Currency;
  virtualAccountNumber?: string;
  virtualBankAccount?: string;
  customerIdentifier?: string;
  userId: string;
}
export interface IWalletState {
  wallet: IWallet | null;
  isInitialized: boolean;
  error: string | null;
}

interface IWalletActions {
  initialize: () => Promise<void>;
  setWallet: (wallet: IWallet) => Promise<void>;
  clearWallet: () => Promise<void>;
  setError: (errMessage: string) => void;
}

export const useWalletStore = create<IWalletState & IWalletActions>()(
  persist(
    (set, get) => ({
      wallet: null,
      isInitialized: false,
      error: null,
      setWallet: async (wallet) => {
        set({ wallet });
      },
      initialize: async () => {
        try {
          const state = useWalletStore.getState();
          if (state.wallet) {
            set({ isInitialized: true });
          }
        } catch (err) {
          console.error(`[AuthStore] Failed to initialize`, err);
        } finally {
          set({ isInitialized: true });
        }
      },
      setError: async (errMessage: string) => {
        set({ error: errMessage });
      },
      clearWallet: async ()=>{
        set({wallet:null,error:null,isInitialized:false})
      }
    }),
    {
      name: "Wallet-store",
      storage: createJSONStorage(()=>secureStoreAdapter),
      partialize:(state)=>({
        wallet:state.wallet
      })
    },
  ),
);
