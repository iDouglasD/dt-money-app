import { colors } from "@/shared/colors";
import { useAuth } from "@/shared/hooks/use-auth";
import { useErrorHandler } from "@/shared/hooks/use-error-handler";
import { useEffect } from "react";
import { ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LoadingProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function Loading({ setLoading }: LoadingProps) {
  const { restoreAuthUserSession, handleSignOut } = useAuth()
  const { handleError } = useErrorHandler()

  useEffect(() => {
    (async () => {
      try {
        const userAuth = await restoreAuthUserSession()
        if (!userAuth) {
          await handleSignOut()
        }
      } catch (error) {
        await handleSignOut()
        handleError({
          error,
          defaultMessage: "An error occurred while restoring your session."
        })
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