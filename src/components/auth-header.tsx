import { useKeyboardVisible } from "@/hooks/use-keyboard-visible";
import { Image, View } from "react-native";

export function AuthHeader() {
  const { isKeyboardVisible } = useKeyboardVisible()

  if (isKeyboardVisible) return <></>

  return (
    <View className="flex items-center justify-center w-full min-h-40">
      <Image
        className="h-[48px] w-[255px]"
        source={require('@/assets/logo.png')}
      />
    </View>
  )
}