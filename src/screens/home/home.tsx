import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./_components/list-header";
import { useTransactions } from "@/shared/hooks/use-transactions";

export function Home() {
  const { transactionsResult } = useTransactions()

  const totalTransactions = transactionsResult?.totalTransactions

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={() => (
          <ListHeader
            totalTransactions={totalTransactions}
          />
        )}
        data={[]}
        renderItem={() => <></>}
      />
    </SafeAreaView>
  )
}