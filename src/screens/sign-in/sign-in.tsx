import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { SignInSchema } from "./_validations/sign-in-schema";
import { SignForm } from "./_components/sign-form";
import { DismissKeyboardView } from "@/components/dismiss-keyboard-view";

export function SignIn() {
  const signInForm = useForm<SignInSchema>()
  const { handleSubmit } = signInForm

  function handleSignIn(data: SignInSchema) {

  }

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <FormProvider {...signInForm}>
          <SignForm />
        </FormProvider>
      </View>
    </DismissKeyboardView>
  )
}