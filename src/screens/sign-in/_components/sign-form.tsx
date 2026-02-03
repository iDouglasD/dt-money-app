import { useFormContext } from "react-hook-form"
import { SignInSchema } from "../_validations/sign-in-schema"
import { Input } from "@/components/input"

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
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />
    </>
  )
}