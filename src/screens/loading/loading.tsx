import { colors } from "@/shared/colors";
import { useAuth } from "@/shared/hooks/use-auth";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LoadingProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function Loading({ setLoading }: LoadingProps) {
  const { restoreAuthUserSession, handleSignOut } = useAuth()

  useEffect(() => {
    (async () => {
      try {
        const userAuth = await restoreAuthUserSession()
        if (!userAuth) {
          await handleSignOut()
        }
      } catch (error) {
        await handleSignOut()
        if (error instanceof AxiosError) {
          console.log(error.response?.data)
        }
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <SafeAreaView className="bg-background-primary items-center justify-center flex-1">
      <Image
        className="h-[48px] w-[255px]"
        source={require('@/assets/logo.png')}
      />
      <ActivityIndicator color={colors.white} className="mt-20" />
    </SafeAreaView>
  )
}