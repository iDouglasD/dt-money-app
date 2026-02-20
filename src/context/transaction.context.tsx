import { Transaction } from "@/shared/interfaces/https/transaction-interface"
import { Pagination } from "@/shared/services/transaction.service"
import { createContext, Dispatch, SetStateAction, useState } from "react"

export type TransactionContextType = {
  pagination: Pagination
  setPagination: Dispatch<SetStateAction<Pagination>>
  transactionList: Transaction[]
  setTransactionList: Dispatch<SetStateAction<Transaction[]>>
}

export const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType)

export function TransactionContextProvider({ children }: { children: React.ReactNode }) {
  const [transactionList, setTransactionList] = useState<Transaction[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 5,
    totalRows: 0,
    totalPages: 0
  })

  return (
    <TransactionContext.Provider
      value={{
        pagination,
        transactionList,
        setPagination,
        setTransactionList,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}