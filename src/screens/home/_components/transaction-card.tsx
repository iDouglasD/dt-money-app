import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { Transaction } from "@/shared/interfaces/https/transaction-interface";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { format } from "date-fns";
import { Text, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RightAction } from "./right-action";
import { LeftAction } from "./left-action";
import { moneyMapper } from "@/shared/utils/money-mapper";

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {

  const isExpenseType = transaction.type.id === TransactionTypes.EXPENSE

  return (
    <Swipeable
      containerStyle={{
        alignItems: "center",
        alignSelf: "center",
        overflow: "visible",
        width: "90%",
        marginBottom: 16
      }}
      renderRightActions={() => <RightAction transactionId={transaction.id} />}
      renderLeftActions={() => <LeftAction transaction={transaction} />}
      overshootRight={false}
      overshootLeft={false}
    >
      <View className="h-[140] bg-background-tertiary rounded-[6] p-6">
        <Text className="text-white text-base">
          {transaction.description}
        </Text>
        <Text
          className={clsx("text-2xl font-bold mt-2",
            isExpenseType ? "text-accent-red" : "text-accent-brand-light")
          }
        >
          {isExpenseType && "-"}
          {moneyMapper(transaction.value)}
        </Text>
        <View className="flex-row w-full justify-between items-center">
          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="label-outline"
              color={colors.gray[700]}
              size={23}
            />
            <Text className="text-gray-700 text-base ml-2">
              {transaction.category.name}
            </Text>
          </View>
          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="calendar-month"
              color={colors.gray[700]}
              size={20}
            />
            <Text className="text-gray-700 text-base ml-2">
              {format(transaction.createdAt, "MM/dd/yyyy")}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  )
}