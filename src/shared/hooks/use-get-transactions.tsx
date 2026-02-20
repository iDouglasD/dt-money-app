import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../services/transaction.service"
import { useTransaction } from "./use-transaction"

export function useGetTransactions() {
  const { pagination } = useTransaction()

  const { page, perPage, totalRows } = pagination

  const { data: transactionsResult, isPending: isPendingTransactions } = useQuery({
    queryKey: ['transactions', page, perPage, totalRows],
    queryFn: () => getTransactions({
      page,
      perPage,
    }),
  })

  const transactions = transactionsResult?.data ?? []
  const totalTransactions = transactionsResult?.totalTransactions

  return {
    transactionsResult,
    transactions,
    totalTransactions,
    isPendingTransactions,
  }
}