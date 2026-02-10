
import { NavigationRoutes } from "@/routes/routes";
import "./src/styles/global.css";
import { AuthContextProvider } from "@/context/auth.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { Snackbar } from "@/components/snackbar";
import { BottomSheetContextProvider } from "@/context/bottom-sheet.context";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ReactQueryProvider } from "@/shared/lib/react-query";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <ReactQueryProvider>
        <SnackbarContextProvider>
          <AuthContextProvider>
            <BottomSheetContextProvider>
              <NavigationRoutes />
              <Snackbar />
            </BottomSheetContextProvider>
          </AuthContextProvider>
        </SnackbarContextProvider>
      </ReactQueryProvider>
    </GestureHandlerRootView>
  );
}
