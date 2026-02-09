import { AppHeader } from "@/components/app-header";
import { useErrorHandler } from "@/shared/hooks/use-error-handler";
import { useTransaction } from "@/shared/hooks/use-transaction";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  const { getCategories } = useTransaction()
  const { handleError } = useErrorHandler()

  async function handleTransactionCategories() {
    try {
      await getCategories()
    } catch (error) {
      handleError({
        error,
        defaultMessage: "An error occurred while trying to load transaction categories."
      })
    }
  }

  useEffect(() => {
    (async () => {
      await handleTransactionCategories()
    })()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
    </SafeAreaView>
  )
}