import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {

  return (
    <View className="flex-row items-center mt-2">
      <MaterialIcons
        className="mr-1"
        name="error-outline"
        size={16}
        color={colors["accent-red-background-primary"]}
      />
      <Text className="text-accent-red-background-primary">
        {message}
      </Text>
    </View>
  )
}