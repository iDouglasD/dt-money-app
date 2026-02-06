import { RegisterSchema } from "@/screens/register/_validations/register-schema"
import { SignInSchema } from "@/screens/sign-in/_validations/sign-in-schema"
import { createContext, useState } from "react"

type AuthContextType = {
  user: null
  token: string | null
  handleAuthenticate: (params: SignInSchema) => Promise<void>
  handleRegister: (formData: RegisterSchema) => Promise<void>
  handleSignOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState<string | null>(null)

  async function handleAuthenticate({ email, password }: SignInSchema) { }
  async function handleRegister(formData: RegisterSchema) { }
  async function handleSignOut() { }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}