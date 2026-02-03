import { PropsWithChildren } from "react";
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function DismissKeyboardView({ children }: PropsWithChildren) {

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <ScrollView>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}