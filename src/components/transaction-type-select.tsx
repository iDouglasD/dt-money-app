import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

interface TransactionTypeSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function TransactionTypeSelect<T extends FieldValues>({
  control,
  name,
}: TransactionTypeSelectProps<T>) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const revenueIconColor = value === TransactionTypes.REVENUE ? colors.white : colors['accent-brand-light']
        const expenseIconColor = value === TransactionTypes.EXPENSE ? colors.white : colors['accent-red']

        return (
          <View className="flex-row justify-between gap-2 mt-2">
            <TouchableOpacity
              className={clsx(
                "flex-row items-center gap-2 p-2 flex-1 justify-center h-[58] rounded-xl",
                value === TransactionTypes.REVENUE ? "bg-accent-brand-background-primary" : "bg-background-tertiary"
              )}
              onPress={() => onChange(TransactionTypes.REVENUE)}
            >
              <MaterialIcons
                className="mr-2"
                name="arrow-circle-up"
                color={revenueIconColor}
                size={30}
              />
              <Text className="text-white font-bold">
                Ravanue
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={clsx(
                "flex-row items-center gap-2 p-2 flex-1 justify-center h-[58] rounded-xl",
                value === TransactionTypes.EXPENSE ? "bg-accent-red-background-primary" : "bg-background-tertiary"
              )}
              onPress={() => onChange(TransactionTypes.EXPENSE)}
            >
              <MaterialIcons
                name="arrow-circle-down"
                color={expenseIconColor}
                size={30}
              />
              <Text className="text-white font-bold">
                Expense
              </Text>
            </TouchableOpacity>
          </View>
        )
      }}
    />
  )
}