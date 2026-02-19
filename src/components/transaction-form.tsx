import { View } from "react-native";
import { Input } from "./input";
import { FormProvider, useFormContext } from "react-hook-form";
import { CurrencyInput } from "./currency-input";
import { CategoryModal } from "./category-modal";
import { TransactionTypeSelect } from "./transaction-type-select";
import { TransactionSchema } from "@/screens/home/_validations/transaction-schema";

export function TransactionForm() {
  const transactionForm = useFormContext<TransactionSchema>()
  const { control } = transactionForm

  return (
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
      <FormProvider {...transactionForm}>
        <CategoryModal />
      </FormProvider>
      <TransactionTypeSelect
        control={control}
        name="typeId"
      />
    </View>
  )
}