import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { DeleteModal } from "./delete-modal";

interface RightActionProps {
  transactionId: number
}

export function RightAction({ transactionId }: RightActionProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => setIsModalVisible(true)
  const hideModal = () => setIsModalVisible(false)

  return (
    <>
      <TouchableOpacity
        className="h-[140] bg-accent-red-background-primary w-[80] items-center justify-center"
        activeOpacity={0.8}
        onPress={showModal}
      >
        <MaterialIcons
          name="delete-outline"
          color={colors.white}
          size={30}
        />
      </TouchableOpacity>
      <DeleteModal
        transactionId={transactionId}
        visible={isModalVisible}
        hideModal={hideModal}
      />
    </>
  )
}