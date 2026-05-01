import { useQuery } from "@tanstack/react-query"
import { api } from "../client"
import { IGetWalletTransaction } from "../mutations/wallet/wallet.interface"

export const useGetWallet=(userId:string)=>{

    return useQuery({
        queryKey:[`wallet-${userId}`],
        queryFn: async()=>{
            const {data} = await api.get("/wallet/balance")
            return data
        },
        retry:3,
        enabled:!!userId
    })
}

export const useGetWalletTransactions =(userId:string,payload:IGetWalletTransaction)=>{
    return useQuery({
        queryKey:[`wallet-transactions-${userId}`],
        queryFn: async()=>{
            const {data} = await api.get("/wallet/transactions",{
                params:{
                    ...payload
                }
            })
                return data
        },
        retry:3,
        enabled:!!(userId && payload)
    })
}