import { AppHeader } from "@/components/app-header";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
    </SafeAreaView>
  )
}