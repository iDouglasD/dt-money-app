import { AppHeader } from "@/components/app-header";
import { ScrollView, View } from "react-native";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { useGetTransactions } from "@/shared/hooks/use-get-transactions";
import { TransactionHeaderCard } from "./transaction-header-card";


export function ListHeader() {
  const { totalTransactions } = useGetTransactions()

  const totalRevenue = totalTransactions?.revenue ?? 0
  const totalExpense = totalTransactions?.expense ?? 0
  const total = totalTransactions?.total ?? 0

  return (
    <>
      <AppHeader />
      <View className="h-[150] w-full">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          className="absolute pl-6 h-[141]"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TransactionHeaderCard
            type={TransactionTypes.EXPENSE}
            amount={totalExpense}
          />
          <TransactionHeaderCard
            type={TransactionTypes.REVENUE}
            amount={totalRevenue}
          />
          <TransactionHeaderCard
            type="total"
            amount={total}
          />
        </ScrollView>
      </View>
    </>
  )
}