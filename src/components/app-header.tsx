import { colors } from "@/shared/colors";
import { useAuth } from "@/shared/hooks/use-auth";
import { useBottomSheet } from "@/shared/hooks/use-bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NewTransaction } from "./new-transaction";

export function AppHeader() {
  const { handleSignOut } = useAuth()
  const { openBottomSheet } = useBottomSheet()

  return (
    <View className="w-full flex-row justify-between p-8">
      <View>
        <Image
          className="h-[30px] w-[130px]"
          source={require('@/assets/logo.png')}
        />
        <TouchableOpacity className="flex-row items-center gap-2 mt-2">
          <MaterialIcons name="logout" size={15} color={colors.gray["700"]} />
          <Text className="text-gray-700 text-base" onPress={handleSignOut}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-accent-brand w-[130px] items-center justify-center rounded-xl h-[50px]"
        onPress={() => openBottomSheet(<NewTransaction />, 0)}
      >
        <Text className="text-white font-bold text-sm">
          New transaction
        </Text>
      </TouchableOpacity>
    </View>
  )
}