import { TransactionTypes } from "@/shared/enums/transaction-types";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useTransactions } from "@/shared/hooks/use-transactions";
import { format } from "date-fns";
import { ICONS } from "../_strategies/card-color";
import { CARD_DATA } from "../_strategies/card-data";

export type TransactionHeaderCardType = TransactionTypes | "total"

interface TransactionHeaderCardProps {
  type: TransactionHeaderCardType
  amount: number
}

export function TransactionHeaderCard({ type, amount }: TransactionHeaderCardProps) {
  const { transactionsResult } = useTransactions()

  const iconData = ICONS[type]
  const cardData = CARD_DATA[type]

  const transactions = transactionsResult?.data
  const lastTransaction = transactions?.find(({ type: transactionType }) => transactionType.id === type)

  const hasCreatedAt = !!lastTransaction?.createdAt
  const isNotTotalCard = type !== "total"

  return (
    <View className={`bg-${cardData.bgColor} min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`}>
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base">
          {cardData.label}
        </Text>
        <MaterialIcons
          name={iconData.name}
          color={iconData.color}
          size={26}
        />
      </View>
      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
        {
          isNotTotalCard && (
            <Text className="text-gray-700">
              {hasCreatedAt && (
                format(lastTransaction.createdAt, `'Last ${cardData.label.toLocaleLowerCase()} on' MMMM dd`)
              )}
              {!hasCreatedAt && "No transactions"}
            </Text>
          )
        }
      </View>
    </View>
  )
}

