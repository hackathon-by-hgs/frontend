import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as secureStore from "expo-secure-store";
import { Role } from "react-native";

const KEYS = {
  access: "accessToken",
  refresh: "refreshToken",
  user: "userData",
};

export type ROLE = "ADMIN" | "USER";
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading:boolean
  error: string | null;
}

interface AuthActions {
  initialize: () => Promise<void>;
  setSession: (
    user: User,
    accessToken: string,
    refreshToken: string,
  ) => Promise<void>;
  clearSession: () => Promise<void>;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const secureStoreAdapter = {
  getItem: async (key: string) => {
    return await secureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    return await secureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    return await secureStore.deleteItemAsync(key);
  },
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
        user:null,
        accessToken:null,
        refreshToken:null,
        isAuthenticated:false,
        isInitialized:false,
        error:null,
        isLoading:false,
      initialize: async () => {
        try {
            const state = useAuthStore.getState()
            if(state.accessToken && state.user){
                set({isAuthenticated:true})
            }
        } catch (err) {
          console.error(`[AuthStore] Failed to initialize`, err);
        } finally {
          set({ isInitialized: true });
        }
      },
      setSession: async(user,accessToken,refreshToken)=>{
        set({user,accessToken,refreshToken,isAuthenticated:true,error:null})
      },
      clearSession: async()=>{
        set({user:null,accessToken:null,refreshToken:null,isAuthenticated:false,})
      },
      setError: (error)=>set({error}),
      setLoading:(isLoading)=>set({isLoading})  
    }),
    {
      name: "Auth-store",
      storage: createJSONStorage(() => secureStoreAdapter),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
