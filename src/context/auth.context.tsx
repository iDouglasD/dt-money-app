import { RegisterSchema } from "@/screens/register/_validations/register-schema"
import { SignInSchema } from "@/screens/sign-in/_validations/sign-in-schema"
import { createContext, useState } from "react"
import * as authService from "@/shared/services/auth.service"
import { AuthUser } from "@/shared/interfaces/auth/auth-user-interface"
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthContextType = {
  authUser: AuthUser
  handleAuthenticate: (params: SignInSchema) => Promise<void>
  handleRegister: (formData: RegisterSchema) => Promise<void>
  handleSignOut: () => Promise<void>
  restoreAuthUserSession: () => Promise<string | null>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser>({
    user: null,
    token: null,
  })

  async function saveAuthUserToStorage({ token, user }: AuthUser) {
    await AsyncStorage.setItem('@dtmoney:auth', JSON.stringify({ token, user }));
  }

  async function handleAuthenticate(userData: SignInSchema) {
    const { token, user } = await authService.authenticate(userData)
    await saveAuthUserToStorage({ token, user });
    setAuthUser({ token, user })
  }

  async function handleRegister(formData: RegisterSchema) {
    const { token, user } = await authService.registerUser(formData)
    await saveAuthUserToStorage({ token, user });
    setAuthUser({ token, user })
  }

  async function handleSignOut() {
    await AsyncStorage.removeItem('@dtmoney:auth');
    setAuthUser({ token: null, user: null })
  }

  async function restoreAuthUserSession() {
    const storedAuth = await AsyncStorage.getItem('@dtmoney:auth');
    if (storedAuth) {
      const { token, user } = JSON.parse(storedAuth) as AuthUser
      setAuthUser({ token, user });
    }
    return storedAuth;
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        handleAuthenticate,
        handleRegister,
        handleSignOut,
        restoreAuthUserSession
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}