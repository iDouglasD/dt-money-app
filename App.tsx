
import { NavigationRoutes } from "@/routes/routes";
import "./src/styles/global.css";
import { AuthContextProvider } from "@/context/auth.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { Snackbar } from "@/components/snackbar";
import { BottomSheetContextProvider } from "@/context/bottom-sheet.context";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ReactQueryProvider } from "@/shared/lib/react-query";
import { TransactionContextProvider } from "@/context/transaction.context";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <ReactQueryProvider>
        <SnackbarContextProvider>
          <AuthContextProvider>
            <TransactionContextProvider>
              <BottomSheetContextProvider>
                <NavigationRoutes />
                <Snackbar />
              </BottomSheetContextProvider>
            </TransactionContextProvider>
          </AuthContextProvider>
        </SnackbarContextProvider>
      </ReactQueryProvider>
    </GestureHandlerRootView>
  );
}
