import { UpdateTransaction } from "@/components/update-transaction";
import { colors } from "@/shared/colors";
import { useBottomSheet } from "@/shared/hooks/use-bottom-sheet";
import { Transaction } from "@/shared/interfaces/https/transaction-interface";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

interface LeftActionProps {
  transaction: Transaction
}

export function LeftAction({ transaction }: LeftActionProps) {

  const { openBottomSheet } = useBottomSheet()

  return (
    <Pressable onPress={() => (
      openBottomSheet(<UpdateTransaction transaction={transaction} />, 0)
    )}>
      <View className="h-[140] bg-accent-blue-dark w-[80] rounded-l-[6] items-center justify-center">
        <MaterialIcons
          name="edit"
          color={colors.white}
          size={30}
        />
      </View>
    </Pressable>
  )
}