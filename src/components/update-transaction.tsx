import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors";
import { useBottomSheet } from "@/shared/hooks/use-bottom-sheet";
import { useErrorHandler } from "@/shared/hooks/use-error-handler";
import { Button } from "./button";
import { useSnackbar } from "@/shared/hooks/use-snackbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction, updateTransaction } from "@/shared/services/transaction.service";
import { TransactionSchema, transactionSchema } from "@/screens/home/_validations/transaction-schema";
import { TransactionForm } from "./transaction-form";
import { Transaction } from "@/shared/interfaces/https/transaction-interface";

interface UpdateTransactionProps {
  transaction: Transaction
}


export function UpdateTransaction({ transaction }: UpdateTransactionProps) {
  const { closeBottomSheet } = useBottomSheet()
  const { handleError } = useErrorHandler()
  const { notify } = useSnackbar()
  const queryClient = useQueryClient();

  const updateTransactionSchemaForm = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      ...transaction
    }
  })

  const { handleSubmit, formState: { isSubmitting } } = updateTransactionSchemaForm

  const { mutate: updateTransactionFn } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['transactions'] })
      notify({
        message: "Transaction updated successfully!",
        type: 'success'
      })
    },
    onError: (error: unknown) => {
      handleError({
        error,
        defaultMessage: "An error occurred while trying to update the transaction."
      })
    },
  })

  async function onSubmit(data: TransactionSchema) {
    updateTransactionFn(data)
  }

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">
          Edit Transaction
        </Text>
        <MaterialIcons name="close" size={20} color={colors.gray["700"]} />
      </TouchableOpacity>
      <FormProvider {...updateTransactionSchemaForm}>
        <TransactionForm />
      </FormProvider>
      <View className="mb-4">
        <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {
            isSubmitting ? <ActivityIndicator color={colors.white} /> : "Save Changes"
          }
        </Button>
      </View>
    </View>
  )
}