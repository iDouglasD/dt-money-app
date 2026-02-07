import { useForm } from "react-hook-form"
import { signInSchema, SignInSchema } from "../_validations/sign-in-schema"
import { Input } from "@/components/input"
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "@/components/button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PublicStackParamsList } from "@/routes/public-routes/public-routes";
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from "@/shared/hooks/use-auth";
import { useErrorHandler } from "@/shared/hooks/use-error-handler";
import { colors } from "@/shared/colors";


export function SignForm() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })
  const { handleAuthenticate } = useAuth()
  const { handleError } = useErrorHandler()

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  async function onSubmit({ email, password }: SignInSchema) {
    try {
      await handleAuthenticate({ email, password })
    } catch (error) {
      handleError({
        error,
        defaultMessage: "An error occurred while trying to sign in."
      })
    }
  }

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
        <Button iconName="arrow-forward" onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {
            isSubmitting ? <ActivityIndicator color={colors.white} /> : "Sign In"
          }
        </Button>
        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Don't have an account?
          </Text>
          <Button
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Button>
        </View>
      </View>
    </>
  )
}