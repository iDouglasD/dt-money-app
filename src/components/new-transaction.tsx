import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import z from "zod";
import { colors } from "@/shared/colors";
import { useBottomSheet } from "@/shared/hooks/use-bottom-sheet";
import { Input } from "./input";
import { CurrencyInput } from "./currency-input";

export const newTransactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  typeId: z.number().min(1, "Type is required"),
  categoryId: z.number().min(1, "Category is required"),
  value: z.number().min(0.01, "Value must be greater than 0"),
})

export type NewTransactionSchema = z.infer<typeof newTransactionSchema>

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheet()

  const { control } = useForm<NewTransactionSchema>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      description: "",
      typeId: 0,
      categoryId: 0,
      value: 0,
    }
  })

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
      <View className="flex-1 mt-8 mb-8">
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
      </View>
    </View>
  )
}