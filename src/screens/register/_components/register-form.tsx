
import { Input } from "@/components/input"
import { useForm } from "react-hook-form"
import { registerSchema, RegisterSchema } from "../_validations/register-schema"
import { ActivityIndicator, Text, View } from "react-native"
import { Button } from "@/components/button"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { PublicStackParamsList } from "@/routes/public-routes/public-routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/shared/hooks/use-auth"
import { useErrorHandler } from "@/shared/hooks/use-error-handler"
import { colors } from "@/shared/colors"

export function RegisterForm() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })
  const { handleRegister } = useAuth()
  const { handleError } = useErrorHandler()

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  async function onSubmit(data: RegisterSchema) {
    try {
      await handleRegister(data)
    } catch (error) {
      handleError({
        error,
        defaultMessage: "An error occurred while trying to register."
      })
    }
  }

  return (
    <>
      <Input
        control={control}
        name="name"
        label="NAME"
        placeholder="Your name"
        leftIconName="person"
      />
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
      <Input
        control={control}
        name="confirmPassword"
        label="CONFIRM PASSWORD"
        placeholder="Confirm your password"
        leftIconName="lock-outline"
        secureTextEntry
      />
      <View className="flex-1 justify-between mt-8 mb-6">
        <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {
            isSubmitting ? <ActivityIndicator color={colors.white} /> : "Register"
          }
        </Button>
        <View>
          <Text className="my-6 text-gray-300 text-base">
            Already have an account?
          </Text>
          <Button
            iconName="arrow-back"
            mode="outline"
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Button>
        </View>
      </View>
    </>
  )
}