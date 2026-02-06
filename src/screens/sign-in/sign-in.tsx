import { View } from "react-native";
import { SignForm } from "./_components/sign-form";
import { DismissKeyboardView } from "@/components/dismiss-keyboard-view";
import { AuthHeader } from "@/components/auth-header";

export function SignIn() {

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <SignForm />
      </View>
    </DismissKeyboardView>
  )
}