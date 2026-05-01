import { useMutation } from "@tanstack/react-query"
import { IinitiateTransfer } from "./transfer.interface"
import { api } from "../../client"

export const useInitiateTransfer = ()=>{
    return useMutation({
        mutationKey:["initiate-transfer"],
        mutationFn: async(payload:IinitiateTransfer)=>{
            const {data} = await api.post("/transfer/execute",payload)
            return data
        }
    })
}

export const useExecuteTransfer = ()=>{
    return useMutation({
        mutationKey:["execute-transfer"],
        mutationFn: async(payload:IinitiateTransfer)=>{
            const {data} = await api.post("/transfer/execute",payload)
            return data
        }
    })
}