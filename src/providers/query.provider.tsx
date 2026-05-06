import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { ReactNode, useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 2,
    },
    mutations: {
      retry: 1,
    },
  },
});

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

interface QueryProviderProps {
  children: ReactNode;
}
export function QueryProvider({ children }: QueryProviderProps) {
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (status: AppStateStatus) => {
        if (Platform.OS !== "web") {
          focusManager.setFocused(status === "active");
        }
      },
    );
    return () => subscription.remove();

  },[]);

  return (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
}

export {queryClient}
