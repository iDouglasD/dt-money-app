import { TransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response"
import { createContext, useState } from "react"
import * as transactionService from "@/shared/services/transaction.service"
import { NewTransactionSchema } from "@/components/new-transaction"
import { TransactionCreateResponse } from "@/shared/interfaces/https/transaction-create-response"

export type TransactionContextType = {
  categories: TransactionCategoryResponse[]
  getCategories: () => Promise<void>
  createTransaction: (data: NewTransactionSchema) => Promise<TransactionCreateResponse>
}

export const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType)

export function TransactionContextProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>([])

  async function getCategories() {
    const response = await transactionService.getTransactionCategories()
    setCategories(response)
  }

  async function createTransaction(data: NewTransactionSchema) {
    const response = await transactionService.createTransaction(data)
    return response
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        getCategories,
        createTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}