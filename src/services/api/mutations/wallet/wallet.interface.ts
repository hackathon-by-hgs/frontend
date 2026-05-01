export  interface IGetWalletTransaction{
    page?:number
    limit?:number
    startDate?:number
    endDate?:number
    transactionType?: ItransctionType
}
export type ItransctionType = "CREDIT" | "DEBIT"