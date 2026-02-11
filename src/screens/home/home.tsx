import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./_components/list-header";
import { useTransactions } from "@/shared/hooks/use-transactions";
import { TransactionCard } from "./_components/transaction-card";

export function Home() {
  const { transactions } = useTransactions()

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
      />
    </SafeAreaView>
  )
}