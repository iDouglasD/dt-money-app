import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./_components/list-header";
import { TransactionCard } from "./_components/transaction-card";
import { useTransaction } from "@/shared/hooks/use-transaction";
import { useGetTransactions } from "@/shared/hooks/use-get-transactions";

export function Home() {
  const { setPagination, transactionList } = useTransaction()
  const { IsLoadingTransactions, totalPages } = useGetTransactions()

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactionList}
        keyExtractor={({ id }) => `transaction-${id}`}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!IsLoadingTransactions) {
            setPagination(prev => ({ ...prev, page: prev.page + 1, totalPages }))
          }
        }}
      />
    </SafeAreaView >
  )
}