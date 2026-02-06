import { AuthHeader } from "@/components/auth-header";
import { DismissKeyboardView } from "@/components/dismiss-keyboard-view";
import { View } from "react-native";
import { RegisterForm } from "./_components/register-form";

export function Register() {
  return (
    <DismissKeyboardView >
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  )
}