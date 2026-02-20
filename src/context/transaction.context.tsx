import { Pagination } from "@/shared/services/transaction.service"
import { createContext, Dispatch, SetStateAction, useState } from "react"

export type TransactionContextType = {
  pagination: Pagination
  setPagination: Dispatch<SetStateAction<Pagination>>
}

export const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType)

export function TransactionContextProvider({ children }: { children: React.ReactNode }) {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
  })

  return (
    <TransactionContext.Provider
      value={{
        pagination,
        setPagination,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}