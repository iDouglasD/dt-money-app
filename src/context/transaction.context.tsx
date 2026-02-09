import { TransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response"
import { createContext, useState } from "react"
import * as transactionService from "@/shared/services/transaction.service"

export type TransactionContextType = {
  getCategories: () => Promise<void>
  categories: TransactionCategoryResponse[]
}

export const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType)

export function TransactionContextProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>([])

  async function getCategories() {
    const response = await transactionService.getTransactionCategories()
    setCategories(response)
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        getCategories
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}