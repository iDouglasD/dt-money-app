import { colors } from "@/shared/colors";
import { useErrorHandler } from "@/shared/hooks/use-error-handler";
import { useSnackbar } from "@/shared/hooks/use-snackbar";
import { deleteTransaction } from "@/shared/services/transaction.service";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface DeleteModalProps {
  transactionId: number
  visible: boolean
  hideModal: () => void
}

export function DeleteModal({ transactionId, visible, hideModal }: DeleteModalProps) {
  const { handleError } = useErrorHandler()
  const { notify } = useSnackbar()

  const queryClient = useQueryClient();

  const {
    mutate: deleteTransactionFn,
    isPending: isPendingDeleteTransaction
  } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['transactions'] })
      notify({
        message: "Transaction deleted successfully!",
        type: 'success'
      })
      hideModal()
    },
    onError: (error: unknown) => {
      handleError({
        error,
        defaultMessage: "An error occurred while trying to delete the transaction."
      })
    },
  })

  return (
    <View className="flex-1 absolute">
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 bg-black/50 items-center justify-center">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="m-5 bg-background-secondary rounded-2xl p-8 items-center shadow-lg w-[90%] h-[322] z-9">
                <View className="w-full flex-row justify-between items-center border-b border-gray-300 pb-6">
                  <View className="flex-row gap-6 items-center">
                    <MaterialIcons
                      className="mr-4"
                      name="error-outline"
                      color={colors.gray[700]}
                      size={25}
                    />
                    <Text className="text-white text-xl">
                      Delete transaction?
                    </Text>
                  </View>
                  <TouchableOpacity onPress={hideModal}>
                    <MaterialIcons
                      name="close"
                      color={colors.gray[800]}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
                <View className="p-3 flex-1 border-b border-gray-300 items-center justify-center">
                  <Text className="text-gray-500 text-lg leading-8">
                    Are you sure you want to delete this transaction? This action cannot be undone.
                  </Text>
                </View>
                <View className="flex-row justify-end gap-4 w-full p-6 pb-0 pr-0">
                  <TouchableOpacity
                    className="w-[100] bg-none border-2 border-accent-brand items-center justify-center p-3 rounded-[6]"
                    onPress={hideModal}
                  >
                    <Text className="text-accent-brand">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="w-[100] bg-accent-red-background-primary items-center justify-center p-3 rounded-[6]"
                    onPress={() => deleteTransactionFn(transactionId)}
                    disabled={isPendingDeleteTransaction}
                  >
                    <Text className="text-white">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )

}