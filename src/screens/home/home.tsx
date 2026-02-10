import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./_components/list-header";
import { getTransactions } from "@/shared/services/transaction.service";
import { useQuery } from "@tanstack/react-query";

export function Home() {
  const { data: transactions, isPending: isPendingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions({
      page: 1,
      perPage: 10,
    }),
  })

  const totalTransactions = transactions?.totalTransactions

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={() => <ListHeader totalTransactions={totalTransactions} />}
        data={[]}
        renderItem={() => <></>}
      />
    </SafeAreaView>
  )
}