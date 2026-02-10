import { AppHeader } from "@/components/app-header";
import { ScrollView, View } from "react-native";
import { TransactionCard } from "./transaction-card";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { TotalTransactions } from "@/shared/interfaces/https/transaction-interface";

interface ListHeaderProps {
  totalTransactions?: TotalTransactions
}

export function ListHeader({ totalTransactions }: ListHeaderProps) {
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
          <TransactionCard
            type={TransactionTypes.EXPENSE}
            amount={totalExpense}
          />
          <TransactionCard
            type={TransactionTypes.REVENUE}
            amount={totalRevenue}
          />
          <TransactionCard
            type="total"
            amount={total}
          />
        </ScrollView>
      </View>
    </>
  )
}