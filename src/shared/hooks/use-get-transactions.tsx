import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../services/transaction.service"
import { useTransaction } from "./use-transaction"
import { useEffect } from "react"

export function useGetTransactions() {
  const { pagination, setTransactionList } = useTransaction()

  const { page, perPage } = pagination

  const {
    data: transactionsResult,
    isPending: isPendingTransactions,
    isRefetching: isRefetchingTransactions,
    refetch: refetchTransactions
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions({
      page,
      perPage,
    })
  })

  const transactions = transactionsResult?.data ?? []
  const totalPages = transactionsResult?.totalPages ?? 0
  const totalTransactions = transactionsResult?.totalTransactions

  useEffect(() => {
    if (transactionsResult) {
      const isLastPage = pagination.page > totalPages
      if (!isLastPage) {
        refetchTransactions()
      }
    }
  }, [pagination])

  useEffect(() => {
    const hasTransactions = transactionsResult && transactions.length > 0

    if (hasTransactions && !isRefetchingTransactions) {
      setTransactionList((prev) => {
        const newTransactions = transactions.filter(
          (transaction) => !prev.some((t) => t.id === transaction.id)
        )
        return [...prev, ...newTransactions]
      })
    }
  }, [transactionsResult])

  return {
    totalPages,
    transactionsResult,
    transactions,
    totalTransactions,
    isPendingTransactions,
    isRefetchingTransactions
  }
}