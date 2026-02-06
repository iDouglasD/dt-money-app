import { useFormContext } from "react-hook-form"
import { SignInSchema } from "../_validations/sign-in-schema"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Text, View } from "react-native"

export function SignForm() {
  const { control } = useFormContext<SignInSchema>()

  return (
    <>
      <Input
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@exemple.br"
        leftIconName="mail-outline"
      />
      <Input
        control={control}
        name="password"
        label="PASSWORD"
        placeholder="Your password"
        leftIconName="lock-outline"
        secureTextEntry
      />
      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <Button iconName="arrow-forward">
          Sign In
        </Button>
        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Don't have an account?
          </Text>
          <Button iconName="arrow-forward" mode="outline">
            Register
          </Button>
        </View>
      </View>
    </>
  )
}