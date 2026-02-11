import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../services/transaction.service"

export function useTransactions() {
  const { data: transactionsResult, isPending: isPendingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions({
      page: 1,
      perPage: 10,
    }),
  })

  return {
    transactionsResult,
    isPendingTransactions,
  }
}