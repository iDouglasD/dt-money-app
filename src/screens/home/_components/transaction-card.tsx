import { TransactionTypes } from "@/shared/enums/transaction-types";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { ICONS } from "../_helper/card-color";
import { CARD_DATA } from "../_helper/card-data";

export type TransactionCardType = TransactionTypes | "total"

interface TransactionCardProps {
  type: TransactionCardType
  amount: number
}

export function TransactionCard({ type, amount }: TransactionCardProps) {
  const iconData = ICONS[type]
  const cardData = CARD_DATA[type]

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
      </View>
    </View>
  )
}

