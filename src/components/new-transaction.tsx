import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import z from "zod";
import { colors } from "@/shared/colors";
import { useBottomSheet } from "@/shared/hooks/use-bottom-sheet";
import { Input } from "./input";
import { CurrencyInput } from "./currency-input";
import { TransactionTypeSelect } from "./transaction-type-select";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { CategoryModal } from "./category-modal";

export const newTransactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  typeId: z.enum(TransactionTypes),
  categoryId: z.number().min(1, "Category is required"),
  value: z.number().min(0.01, "Value must be greater than 0"),
})

export type NewTransactionSchema = z.infer<typeof newTransactionSchema>

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheet()

  const newTransactionSchemaForm = useForm<NewTransactionSchema>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      description: "",
      typeId: TransactionTypes.REVENUE,
      categoryId: 0,
      value: 0,
    }
  })

  const { control } = newTransactionSchemaForm

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">
          New Transaction
        </Text>
        <MaterialIcons name="close" size={20} color={colors.gray["700"]} />
      </TouchableOpacity>

      <View className="flex-1 my-8">
        <Input
          control={control}
          name="description"
          placeholder="Description"
        />
        <CurrencyInput
          control={control}
          name="value"
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
        />
        <FormProvider {...newTransactionSchemaForm}>
          <CategoryModal />
        </FormProvider>
        <TransactionTypeSelect
          control={control}
          name="typeId"
        />
      </View>
    </View>
  )
}