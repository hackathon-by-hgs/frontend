import { useQuery } from "@tanstack/react-query"
import { api } from "../client"

export const useGetUser = ()=>{
    return useQuery({
        queryKey:["user"],
        queryFn:async()=>{
            const {data}= await api.post("/")
        }
    })
}